from secure_banking_system import BankingSystem
from datetime import datetime

def print_separator():
    print("\n" + "="*50 + "\n")

def print_header(text):
    print(f"\n{'='*20} {text} {'='*20}\n")

def print_account_info(name, account_id, balance):
    print(f"Account Holder: {name}")
    print(f"Account ID: {account_id}")
    print(f"Balance: ${balance:,.2f}")

def main():
    print_header("SECURE BANKING SYSTEM DEMO")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    # Initialize the banking system
    bank_system = BankingSystem()
    
    # Create test accounts
    print_header("CREATING ACCOUNTS")
    account1 = bank_system.bank.create_account("Soham", 1000)
    account2 = bank_system.bank.create_account("Pragati", 2000)
    
    acc1 = bank_system.bank.get_account(account1)
    acc2 = bank_system.bank.get_account(account2)
    
    print("Account 1:")
    print_account_info("Soham", account1, acc1._balance)
    print_separator()
    print("Account 2:")
    print_account_info("Pragati", account2, acc2._balance)
    
    # Test a transfer
    print_header("TESTING NORMAL TRANSFER")
    amount = 500
    print(f"Attempting to transfer ${amount:,.2f} from Soham to Pragati...")
    success = bank_system.bank.transfer_funds(account1, account2, amount)
    print(f"Transfer Status: {'✓ SUCCESS' if success else '✗ FAILED'}")
    
    # Get updated account details
    acc1 = bank_system.bank.get_account(account1)
    acc2 = bank_system.bank.get_account(account2)
    
    print("\nUpdated Balances:")
    print(f"Soham's Balance: ${acc1._balance:,.2f}")
    print(f"Pragati's Balance: ${acc2._balance:,.2f}")
    
    # Test transaction limits
    print_header("TESTING TRANSACTION LIMITS")
    large_amount = 6000
    print(f"Attempting to transfer ${large_amount:,.2f} (exceeds limit)...")
    success = bank_system.bank.transfer_funds(account1, account2, large_amount)
    print(f"Transfer Status: {'✓ SUCCESS' if success else '✗ FAILED'}")
    print("Note: Transfer failed due to exceeding single transaction limit ($5,000)")

if __name__ == "__main__":
    main() 