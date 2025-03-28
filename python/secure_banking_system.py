import os
import uuid
import datetime
import threading
import random
import logging
from cryptography.fernet import Fernet
from dotenv import load_dotenv
from hashlib import pbkdf2_hmac
import base64

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='banking_system.log'
)
logger = logging.getLogger('BankingSystem')

class SecurityManager:
    def __init__(self):
        # Get encryption key from environment variable or generate a new one
        self.encryption_key = os.getenv('ENCRYPTION_KEY')
        if not self.encryption_key:
            self.encryption_key = base64.urlsafe_b64encode(os.urandom(32))
            logger.warning("No encryption key found in environment. Generated new key.")
        
        self.cipher_suite = Fernet(self.encryption_key)
    
    def encrypt_data(self, data: str) -> bytes:
        """Encrypt sensitive data"""
        return self.cipher_suite.encrypt(data.encode())
    
    def decrypt_data(self, encrypted_data: bytes) -> str:
        """Decrypt sensitive data"""
        return self.cipher_suite.decrypt(encrypted_data).decode()
    
    @staticmethod
    def hash_password(password: str, salt: bytes = None) -> tuple:
        """Hash password using PBKDF2"""
        if not salt:
            salt = os.urandom(16)
        hashed = pbkdf2_hmac('sha256', password.encode(), salt, 100000)
        return hashed, salt

class BankAccount:
    def __init__(self, security_manager, account_holder, initial_balance=0):
        self.security_manager = security_manager
        self.account_id = str(uuid.uuid4())
        # Encrypt sensitive data
        self.account_holder = self.security_manager.encrypt_data(account_holder)
        self._balance = initial_balance
        self.transaction_history = []
        self.is_active = True
        self._overdraft_limit = float(os.getenv('OVERDRAFT_LIMIT', '500'))
        self.last_activity = datetime.datetime.now()

    def deposit(self, amount):
        if amount <= 0:
            logger.warning(f"Invalid deposit amount attempted: {amount}")
            return False
            
        self._balance += amount
        self._log_transaction("DEPOSIT", amount)
        self.last_activity = datetime.datetime.now()
        return True

    def withdraw(self, amount):
        if amount <= 0:
            logger.warning(f"Invalid withdrawal amount attempted: {amount}")
            return False
        
        if self._balance + self._overdraft_limit >= amount:
            self._balance -= amount
            self._log_transaction("WITHDRAWAL", amount)
            self.last_activity = datetime.datetime.now()
            return True
        
        logger.warning(f"Insufficient funds for withdrawal: {amount}")
        return False

    def _log_transaction(self, transaction_type, amount):
        transaction = {
            'id': str(uuid.uuid4()),
            'type': transaction_type,
            'amount': amount,
            'timestamp': datetime.datetime.now(),
            'balance': self._balance
        }
        self.transaction_history.append(transaction)
        logger.info(f"Transaction logged: {transaction_type} - Amount: {amount}")

class Bank:
    def __init__(self, name):
        self.security_manager = SecurityManager()
        self.name = name
        self.accounts = {}
        self._account_lock = threading.Lock()
        self.transaction_limits = {
            'daily': float(os.getenv('DAILY_TRANSACTION_LIMIT', '10000')),
            'single': float(os.getenv('SINGLE_TRANSACTION_LIMIT', '5000'))
        }

    def create_account(self, account_holder, initial_balance=0):
        with self._account_lock:
            account = BankAccount(self.security_manager, account_holder, initial_balance)
            self.accounts[account.account_id] = account
            logger.info(f"New account created: {account.account_id}")
            return account.account_id

    def get_account(self, account_id):
        account = self.accounts.get(account_id)
        if account:
            # Check for account inactivity
            if (datetime.datetime.now() - account.last_activity).days > int(os.getenv('ACCOUNT_INACTIVE_DAYS', '90')):
                account.is_active = False
                logger.warning(f"Account {account_id} marked as inactive due to no activity")
        return account

    def transfer_funds(self, from_account_id, to_account_id, amount):
        try:
            if amount > self.transaction_limits['single']:
                logger.warning(f"Transfer amount {amount} exceeds single transaction limit")
                return False

            with self._account_lock:
                from_account = self.get_account(from_account_id)
                to_account = self.get_account(to_account_id)

                if not from_account or not to_account:
                    logger.error("Invalid account(s) in transfer attempt")
                    return False

                if not from_account.is_active or not to_account.is_active:
                    logger.error("Inactive account(s) in transfer attempt")
                    return False

                # Check daily transaction limit
                today_transactions = sum(
                    t['amount'] for t in from_account.transaction_history 
                    if t['type'] == "WITHDRAWAL" 
                    and (datetime.datetime.now() - t['timestamp']).days == 0
                )
                if today_transactions + amount > self.transaction_limits['daily']:
                    logger.warning(f"Daily transaction limit exceeded for account {from_account_id}")
                    return False

                if from_account.withdraw(amount):
                    to_account.deposit(amount)
                    logger.info(f"Transfer successful: {amount} from {from_account_id} to {to_account_id}")
                    return True
                return False
        except Exception as e:
            logger.error(f"Transfer failed: {str(e)}")
            return False

class BankingSystem:
    def __init__(self):
        # Load configuration from environment variables
        bank_name = os.getenv('BANK_NAME', 'Secure Bank')
        self.bank = Bank(bank_name)
        logger.info(f"Banking system initialized for {bank_name}")

    def test_banking(self):
        """Run a test of the banking system"""
        print("\n==================== SECURE BANKING SYSTEM DEMO ====================\n")
        print(f"Time: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # Create test accounts
        print("==================== CREATING ACCOUNTS ====================\n")
        account1 = self.bank.create_account("Soham", 1000)
        account2 = self.bank.create_account("Pragati", 2000)
        
        acc1 = self.bank.get_account(account1)
        acc2 = self.bank.get_account(account2)
        
        print("Account 1:")
        print(f"Account Holder: Soham")
        print(f"Account ID: {account1}")
        print(f"Balance: ${acc1._balance:,.2f}")
        print("\n" + "="*50 + "\n")
        print("Account 2:")
        print(f"Account Holder: Pragati")
        print(f"Account ID: {account2}")
        print(f"Balance: ${acc2._balance:,.2f}")
        
        # Test a transfer
        print("\n==================== TESTING NORMAL TRANSFER ====================\n")
        amount = 500
        print(f"Attempting to transfer ${amount:,.2f} from Soham to Pragati...")
        success = self.bank.transfer_funds(account1, account2, amount)
        print(f"Transfer Status: {'✓ SUCCESS' if success else '✗ FAILED'}")
        
        # Get updated account details
        acc1 = self.bank.get_account(account1)
        acc2 = self.bank.get_account(account2)
        
        print("\nUpdated Balances:")
        print(f"Soham's Balance: ${acc1._balance:,.2f}")
        print(f"Pragati's Balance: ${acc2._balance:,.2f}")
        
        # Test transaction limits
        print("\n==================== TESTING TRANSACTION LIMITS ====================\n")
        large_amount = 6000
        print(f"Attempting to transfer ${large_amount:,.2f} (exceeds limit)...")
        success = self.bank.transfer_funds(account1, account2, large_amount)
        print(f"Transfer Status: {'✓ SUCCESS' if success else '✗ FAILED'}")
        print("Note: Transfer failed due to exceeding single transaction limit ($5,000)")

    def simulate_transactions(self, num_transactions=100):
        accounts = []
        initial_balance = float(os.getenv('SIMULATION_INITIAL_BALANCE', '1000'))
        
        for i in range(5):
            account_id = self.bank.create_account(f"User {i}", initial_balance)
            accounts.append(account_id)

        def random_transaction():
            from_account = random.choice(accounts)
            to_account = random.choice(accounts)
            while to_account == from_account:  # Prevent self-transfers
                to_account = random.choice(accounts)
            amount = random.uniform(10, float(os.getenv('SIMULATION_MAX_AMOUNT', '500')))
            self.bank.transfer_funds(from_account, to_account, amount)

        threads = []
        for _ in range(num_transactions):
            thread = threading.Thread(target=random_transaction)
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join() 