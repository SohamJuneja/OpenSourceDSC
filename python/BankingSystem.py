from Bank import Bank, BankAccount, BankingSystem

banking_system = BankingSystem()
bank = banking_system.bank

account_id = bank.create_account("User", 5000)
account = bank.get_account(account_id)

account_holder = input("Enter account holder name: ")
initial_balance = float(input("Enter initial balance: "))
password = input("Set a password for your account (minimum 8 characters): ")

while len(password) < 8:
    print("Password must be at least 8 characters long.")
    password = input("Set a password for your account (minimum 8 characters): ")

account_id = bank.create_account(account_holder, initial_balance, password)
print(f"Account created successfully! Your account ID is {account_id}")

otp = account.generate_otp()  
user_otp_input = int(input("Enter the OTP sent to your email/SMS: "))

if account.authenticate_with_otp(otp, user_otp_input):
    if account.withdraw(5500, password):
        print("Withdrawal successful!")
    else:
        print("Withdrawal failed.")
else:
    print("MFA failed. Incorrect OTP.")

for transaction in account.transaction_history:
    print(transaction)