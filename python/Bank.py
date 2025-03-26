import uuid
import datetime
import threading
import random
import bcrypt


class BankAccount:
    def __init__(self, account_holder, initial_balance=0, password="default"):
        self.account_id = str(uuid.uuid4())
        self.account_holder = account_holder
        self._balance = initial_balance
        self.transaction_history = []
        self.is_active = True
        self._overdraft_limit = 500
        self._password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        

    def authenticate(self, password):
        """Authenticate the user by verifying the password."""
        return bcrypt.checkpw(password.encode(), self._password_hash)

    def withdraw(self, amount, password):
        """Authenticate before allowing withdrawal."""
        if not self.authenticate(password):
            print("Authentication failed. Incorrect password.")
            return False

        if amount <= 0:
            print("Invalid withdrawal amount")
            return False

        if self._balance + self._overdraft_limit >= amount:
            self._balance -= amount
            self._log_transaction("WITHDRAWAL", amount)
            return True

        print("Insufficient funds")
        return False

    def deposit(self, amount, password):
        """Authenticate before allowing deposit."""
        if not self.authenticate(password):
            print("Authentication failed. Incorrect password.")
            return False

        self._balance += amount
        self._log_transaction("DEPOSIT", amount)
        return True
    def _log_transaction(self, transaction_type, amount):
        transaction = {
            'id': str(uuid.uuid4()),
            'type': transaction_type,
            'amount': amount,
            'timestamp': datetime.datetime.now(),
            'balance': self._balance
        }
        self.transaction_history.append(transaction)
    def generate_otp(self):
        """Generate a one-time password (OTP) for MFA."""
        otp = random.randint(100000, 999999)
        print(f"Your OTP is: {otp}")  # In real-world, send via email/SMS
        return otp

    def authenticate_with_otp(self, otp, user_input):
        """Verify the OTP entered by the user."""
        return otp == user_input

class Bank:
    def __init__(self, name):
        self.name = name
        self.accounts = {}  
        self._account_lock = threading.Lock() 

    def create_account(self, account_holder, initial_balance=0):
        with self._account_lock:
            account = BankAccount(account_holder, initial_balance)
            self.accounts[account.account_id] = account
            return account.account_id

    def get_account(self, account_id):
        return self.accounts.get(account_id)

    def transfer_funds(self, from_account_id, to_account_id, amount, password):
        try:
            with self._account_lock:
                from_account = self.get_account(from_account_id)
                to_account = self.get_account(to_account_id)

                if not from_account or not to_account:
                    print("Invalid account(s)")
                    return False

            
                if not from_account.authenticate(password):
                    print("Authentication failed. Incorrect password.")
                    return False

                otp = from_account.generate_otp()
                user_otp_input = int(input("Enter the OTP sent to your email/SMS: "))
                if not from_account.authenticate_with_otp(otp, user_otp_input):
                    print("MFA failed. Incorrect OTP.")
                    return False

                if from_account.withdraw(amount, password):
                    to_account.deposit(amount, password)
                    print("Transfer successful!")
                    return True

class BankingSystem:
    def __init__(self):
        self.bank = Bank("Vulnerable Bank")

    def simulate_transactions(self, num_transactions=100):
        accounts = []
        for i in range(5):
            account_id = self.bank.create_account(f"User {i}", 1000)
            accounts.append(account_id)

        def random_transaction():
            from_account = random.choice(accounts)
            to_account = random.choice(accounts)
            amount = random.uniform(10, 500)
            self.bank.transfer_funds(from_account, to_account, amount)

        threads = []
        for _ in range(num_transactions):
            thread = threading.Thread(target=random_transaction)
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join()