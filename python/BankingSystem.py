from Bank import Bank, BankAccount, BankingSystem

banking_system = BankingSystem()
bank = banking_system.bank

account_id = bank.create_account("User", 5000)
account = bank.get_account(account_id)

password = "securepassword"
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