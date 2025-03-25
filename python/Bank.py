import uuid
import datetime
import threading
import random

class BankAccount:
    def __init__(self, account_holder, initial_balance=0):
        self.account_id = str(uuid.uuid4())
        self.account_holder = account_holder
        self._balance = initial_balance
        self.transaction_history = []
        self.is_active = True
        self._overdraft_limit = 500 

    def deposit(self, amount):
        self._balance += amount
        self._log_transaction("DEPOSIT", amount)
        return True

    def withdraw(self, amount):
        if amount <= 0:
            print("Invalid withdrawal amount")
            return False
        
        if self._balance + self._overdraft_limit >= amount:
            self._balance -= amount
            self._log_transaction("WITHDRAWAL", amount)
            return True
        
        print("Insufficient funds")
        self._log_transaction("FAILED WITHDRAWAL", amount)
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

    def transfer_funds(self, from_account_id, to_account_id, amount):
        try:
            with self._account_lock:
                from_account = self.get_account(from_account_id)
                to_account = self.get_account(to_account_id)

                if not from_account or not to_account:
                    print("Invalid account(s)")
                    return False

                if from_account.withdraw(amount):
                    to_account.deposit(amount)
                    return True
                return False
        except Exception as e:
            print(f"Transfer failed: {e}")
            return False

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
            if from_account != to_account:
                self.bank.transfer_funds(from_account, to_account, amount)

        threads = []
        for _ in range(num_transactions):
            thread = threading.Thread(target=random_transaction)
            thread.start()
            threads.append(thread)

        for thread in threads:
            thread.join()