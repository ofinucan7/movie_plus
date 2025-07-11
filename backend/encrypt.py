import bcrypt

# encrypt a given password input
def encrypt_pw(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode()

# return bool of whether entered password (entered) matches the encrypted password
def verify_pw(entered: str, encrypt: str) -> bool:
    return bcrypt.checkpw(entered.encode(), encrypt.encode())