export interface PracticalPart {
  part_code: string; // e.g. "Part A", "Part B"
  title: string;
  description?: string;
  language?: string;
  code_content: string;
}

export interface Practical {
  id: string;
  practical_number: number;
  practical_code: string;
  title: string;
  description: string;
  language: string;
  install_command?: string;
  install_label?: string;
  parts: PracticalPart[];
  code_content: string; // Full code combining all parts
  copyable: boolean;
  is_procedural?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const PRACTICALS_DATA: Practical[] = [
  // =========================================================================
  // PRACTICAL 1
  // =========================================================================
  {
    id: "p01",
    practical_number: 1,
    practical_code: "P01",
    title: "Substitution and Transposition Cipher",
    description: "Design and implement algorithms to encrypt and decrypt messages using classical substitution and transposition techniques.",
    language: "python",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "Substitution Cipher",
        description: "Monoalphabetic substitution where characters are mapped using a keyed alphabet.",
        language: "python",
        code_content: `# Practical No. 1 - Part A
# Aim: Implementing Substitution Cipher (Monoalphabetic Substitution)

class SubstitutionCipher:
    def __init__(self, key):
        self.key = key

    def encrypt(self, plaintext):
        encrypted_text = ""
        for char in plaintext:
            if char.isalpha():
                if char.islower():
                    encrypted_text += self.key[ord(char) - ord('a')].lower()
                else:
                    encrypted_text += self.key[ord(char) - ord('A')].upper()
            else:
                encrypted_text += char
        return encrypted_text

    def decrypt(self, ciphertext):
        decrypted_text = ""
        for char in ciphertext:
            if char.isalpha():
                if char.islower():
                    decrypted_text += chr(self.key.lower().index(char) + ord('a'))
                else:
                    decrypted_text += chr(self.key.upper().index(char) + ord('A'))
            else:
                decrypted_text += char
        return decrypted_text


# Example Execution:
if __name__ == '__main__':
    key = "welkfghlserigherispagjuoiphetopsasd"
    sub_cipher = SubstitutionCipher(key)
    message = "Hello World!"
    
    encrypted_message = sub_cipher.encrypt(message)
    decrypted_message = sub_cipher.decrypt(encrypted_message)
    
    print("Original: ", message)
    print("Encrypted:", encrypted_message)
    print("Decrypted:", decrypted_message)`
      },
      {
        part_code: "Part B",
        title: "Transposition Cipher",
        description: "Columnar transposition cipher rearranging characters based on numerical permutation key.",
        language: "python",
        code_content: `# Practical No. 1 - Part B
# Aim: Implementing Transposition Cipher (Columnar Transposition)

class TranspositionCipher:
    def __init__(self, key):
        self.key = str(key)

    def encrypt(self, plaintext):
        num_columns = len(self.key)
        num_rows = len(plaintext) // num_columns + (1 if len(plaintext) % num_columns != 0 else 0)
        matrix = [[''] * num_columns for _ in range(num_rows)]
        for i, char in enumerate(plaintext):
            matrix[i // num_columns][i % num_columns] = char
            
        encrypted_text = ""
        for col in self.key:
            col_index = int(col) - 1
            encrypted_text += ''.join(matrix[row][col_index] for row in range(num_rows))
        return encrypted_text

    def decrypt(self, ciphertext):
        num_columns = len(self.key)
        num_rows = len(ciphertext) // num_columns + (1 if len(ciphertext) % num_columns != 0 else 0)
        matrix = [[''] * num_columns for _ in range(num_rows)]
        char_index = 0
        for col in self.key:
            col_index = int(col) - 1
            for row in range(num_rows):
                if char_index < len(ciphertext):
                    matrix[row][col_index] = ciphertext[char_index]
                    char_index += 1
                    
        decrypted_text = ""
        for i in range(num_rows):
            decrypted_text += ''.join(matrix[i])
        return decrypted_text


# Example Execution:
if __name__ == '__main__':
    key = "4312567"
    trans_cipher = TranspositionCipher(key)
    message = "Hello World!"
    
    encrypted_message = trans_cipher.encrypt(message)
    decrypted_message = trans_cipher.decrypt(encrypted_message)
    
    print("Original: ", message)
    print("Encrypted:", encrypted_message)
    print("Decrypted:", decrypted_message)`
      }
    ],
    code_content: `# Practical No. 1
# Aim: To study and implement Substitution Cipher and Transposition Cipher.

# ==========================================
# PART A: Substitution Cipher
# ==========================================

class SubstitutionCipher:
    def __init__(self, key):
        self.key = key

    def encrypt(self, plaintext):
        encrypted_text = ""
        for char in plaintext:
            if char.isalpha():
                if char.islower():
                    encrypted_text += self.key[ord(char) - ord('a')].lower()
                else:
                    encrypted_text += self.key[ord(char) - ord('A')].upper()
            else:
                encrypted_text += char
        return encrypted_text

    def decrypt(self, ciphertext):
        decrypted_text = ""
        for char in ciphertext:
            if char.isalpha():
                if char.islower():
                    decrypted_text += chr(self.key.lower().index(char) + ord('a'))
                else:
                    decrypted_text += chr(self.key.upper().index(char) + ord('A'))
            else:
                decrypted_text += char
        return decrypted_text


key_sub = "welkfghlserigherispagjuoiphetopsasd"
sub_cipher = SubstitutionCipher(key_sub)
message = "Hello World!"

encrypted_sub = sub_cipher.encrypt(message)
decrypted_sub = sub_cipher.decrypt(encrypted_sub)

print("--- Part A: Substitution Cipher ---")
print("Original: ", message)
print("Encrypted: ", encrypted_sub)
print("Decrypted: ", decrypted_sub)
print()


# ===========================================
# PART B: Transposition Cipher
# ===========================================

class TranspositionCipher:
    def __init__(self, key):
        self.key = str(key)

    def encrypt(self, plaintext):
        num_columns = len(self.key)
        num_rows = len(plaintext) // num_columns + (1 if len(plaintext) % num_columns != 0 else 0)
        matrix = [[''] * num_columns for _ in range(num_rows)]
        for i, char in enumerate(plaintext):
            matrix[i // num_columns][i % num_columns] = char
            
        encrypted_text = ""
        for col in self.key:
            col_index = int(col) - 1
            encrypted_text += ''.join(matrix[row][col_index] for row in range(num_rows))
        return encrypted_text

    def decrypt(self, ciphertext):
        num_columns = len(self.key)
        num_rows = len(ciphertext) // num_columns + (1 if len(ciphertext) % num_columns != 0 else 0)
        matrix = [[''] * num_columns for _ in range(num_rows)]
        char_index = 0
        for col in self.key:
            col_index = int(col) - 1
            for row in range(num_rows):
                if char_index < len(ciphertext):
                    matrix[row][col_index] = ciphertext[char_index]
                    char_index += 1
                    
        decrypted_text = ""
        for i in range(num_rows):
            decrypted_text += ''.join(matrix[i])
        return decrypted_text


key_trans = "4312567"
trans_cipher = TranspositionCipher(key_trans)
message_trans = "Hello World!"

encrypted_trans = trans_cipher.encrypt(message_trans)
decrypted_trans = trans_cipher.decrypt(encrypted_trans)

print("--- Part B: Transposition Cipher ---")
print("Original:", message_trans)
print("Encrypted:", encrypted_trans)
print("Decrypted:", decrypted_trans)`
  },

  // =========================================================================
  // PRACTICAL 2
  // =========================================================================
  {
    id: "p02",
    practical_number: 2,
    practical_code: "P02",
    title: "RSA Encryption and Decryption",
    description: "Implementing the RSA algorithm for public-key encryption and decryption, and explore its properties and security considerations.",
    language: "python",
    install_command: "pip install pycryptodome",
    install_label: "Install PyCryptodome",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "RSA Key Pair Generation & Encryption",
        description: "Generate 1024-bit RSA public/private key pairs and encrypt using PKCS1_OAEP.",
        language: "python",
        code_content: `# Practical No. 2 - Part A
# Aim: RSA Key Generation and Encryption
# CMD: pip install pycryptodome

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

# Step 1: Generate RSA Key Pair (1024-bit)
keyPair = RSA.generate(1024)

# Public Key
pubkey = keyPair.publickey()
print(f"Public key: (n={hex(pubkey.n)} , e={hex(pubkey.e)} )")
pubkeyPEM = pubkey.export_key()
print(pubkeyPEM.decode('ascii'))

# Private Key
print(f"Private key: (n={hex(pubkey.n)} , d={hex(keyPair.d)} )")
privkeyPEM = keyPair.export_key()
print(privkeyPEM.decode('ascii'))

# Step 2: Encrypt message with Public Key
msg = b'IsmileAcademy'
encryptor = PKCS1_OAEP.new(pubkey)
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted).decode('ascii'))`
      },
      {
        part_code: "Part B",
        title: "RSA Decryption",
        description: "Decrypt the ciphertext using the recipient private key with PKCS1_OAEP.",
        language: "python",
        code_content: `# Practical No. 2 - Part B
# Aim: RSA Decryption using Private Key
# CMD: pip install pycryptodome

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP

# Decrypt using the private keyPair
# (Assuming 'encryptor' and 'encrypted' from Part A)
decryptor = PKCS1_OAEP.new(keyPair)
decrypted = decryptor.decrypt(encrypted)
print("Decrypted Plaintext:", decrypted.decode('utf-8'))`
      }
    ],
    code_content: `# Practical No. 2: RSA Encryption and Decryption
# Aim: To study and implement the RSA algorithm for public-key encryption and decryption.
#
# CMD Command to Install Library:
# pip install pycryptodome

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

# ==========================================
# Step 1: Key Pair Generation (1024-bit)
# ==========================================
keyPair = RSA.generate(1024)

# Export and display Public Key
pubkey = keyPair.publickey()
print(f"Public key: (n={hex(pubkey.n)} , e={hex(pubkey.e)} )")
pubkeyPEM = pubkey.export_key()
print(pubkeyPEM.decode('ascii'))

# Export and display Private Key
print(f"Private key: (n={hex(pubkey.n)} , d={hex(keyPair.d)} )")
privkeyPEM = keyPair.export_key()
print(privkeyPEM.decode('ascii'))

# ==========================================
# Step 2: RSA Encryption (Part A)
# ==========================================
msg = b'IsmileAcademy'
encryptor = PKCS1_OAEP.new(pubkey)
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted).decode('ascii'))

# ==========================================
# Step 3: RSA Decryption (Part B)
# ==========================================
decryptor = PKCS1_OAEP.new(keyPair)
decrypted = decryptor.decrypt(encrypted)
print("Decrypted:", decrypted.decode('ascii'))`
  },

  // =========================================================================
  // PRACTICAL 3
  // =========================================================================
  {
    id: "p03",
    practical_number: 3,
    practical_code: "P03",
    title: "Message Authentication Codes",
    description: "Implement algorithm to generate and verify message authentication codes(MACs) for ensuring data integrity and authenticity of digitally signed message.",
    language: "python",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "MD5 Hash Generation (from Manual)",
        description: "Generate MD5 digests in byte format for given input messages as shown in the lab manual.",
        language: "python",
        code_content: `# Practical No. 3 - Part A
# Aim: MD5 Hash Generation (as presented in the lab manual)

import hashlib

result1 = hashlib.md5(b'Esmile')
result2 = hashlib.md5(b'Niranjan')

print("The byte equivalent of hash is: ", end="")
print(result1.digest())

print("The byte equivalent of hash is: ", end="")
print(result2.digest())`
      },
      {
        part_code: "Part B",
        title: "Keyed HMAC Implementation (Data Integrity)",
        description: "Compute secret-key based HMAC using SHA-256 for sender authentication and message integrity.",
        language: "python",
        code_content: `# Practical No. 3 - Part B
# Aim: Keyed-Hash Message Authentication Code (HMAC-SHA256)

import hmac
import hashlib

secret_key = b"ins_lab_secret_key"
message = b"Confidential examination transmission."

# Generate HMAC
mac = hmac.new(secret_key, message, hashlib.sha256).hexdigest()
print("Generated HMAC:", mac)

# Verify HMAC on receiver side
def verify_mac(key, msg, received_mac):
    computed = hmac.new(key, msg, hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, received_mac)

is_authentic = verify_mac(secret_key, message, mac)
print("MAC Verification Result:", is_authentic)`
      }
    ],
    code_content: `# Practical No. 3: Message Authentication Codes
# Aim: To study and implement the Message Authentication Code for ensuring 
# message integrity and authenticity.

import hashlib
import hmac

# Part A: MD5 Hash Generation (Original Lab Implementation)
result1 = hashlib.md5(b'Esmile')
result2 = hashlib.md5(b'Niranjan')

print("--- Part A: MD5 Hash Digests ---")
print("The byte equivalent of hash is: ", end="")
print(result1.digest())

print("The byte equivalent of hash is: ", end="")
print(result2.digest())

print("Hash 1 (Hex):", result1.hexdigest())
print("Hash 2 (Hex):", result2.hexdigest())
print()

# Part B: Keyed HMAC Verification
print("--- Part B: Keyed HMAC (Integrity & Authenticity) ---")
secret_key = b"secret_shared_key"
message = b"Information and Network Security Lab"

generated_mac = hmac.new(secret_key, message, hashlib.sha256).hexdigest()
print("Generated MAC:", generated_mac)
print("Integrity Verified:", hmac.compare_digest(generated_mac, hmac.new(secret_key, message, hashlib.sha256).hexdigest()))`
  },

  // =========================================================================
  // PRACTICAL 4
  // =========================================================================
  {
    id: "p04",
    practical_number: 4,
    practical_code: "P04",
    title: "Digital Signature",
    description: "Implement Digital Signature Algorithms such as RSA-based signature, and verify the integrity and authenticity of digitally signed messages.",
    language: "python",
    install_command: "pip install pycryptodome",
    install_label: "Install PyCryptodome",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "Signature Generation",
        description: "Hash the message with SHA-256 and sign it using the sender's private RSA key (PKCS1_v1_5).",
        language: "python",
        code_content: `# Practical No. 4 - Part A: Signature Generation
# CMD: pip install pycryptodome

from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto import Random

def generate_signature(private_key, message):
    key = RSA.importKey(private_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    signer = PKCS1_v1_5.new(key)
    signature = signer.sign(hashed_message)
    return signature

# Generate 2048-bit key pair
random_generator = Random.new().read
key_pair = RSA.generate(2048, random_generator)
private_key = key_pair.export_key()
public_key = key_pair.publickey().export_key()

message = "Hello, World!"
signature = generate_signature(private_key, message)
print("Generated Signature:", signature)`
      },
      {
        part_code: "Part B",
        title: "Signature Verification",
        description: "Verify received signature against message using sender's public RSA key.",
        language: "python",
        code_content: `# Practical No. 4 - Part B: Signature Verification
# CMD: pip install pycryptodome

from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA

def verify_signature(public_key, message, signature):
    key = RSA.importKey(public_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    verifier = PKCS1_v1_5.new(key)
    return verifier.verify(hashed_message, signature)

# Verify the signature generated in Part A
is_valid = verify_signature(public_key, message, signature)
print("Signature Verification Result:", is_valid)`
      }
    ],
    code_content: `# Practical No. 4: Digital Signature Algorithm
# Aim: To study and implement the Digital Signature algorithm.
#
# CMD Command to Install Library:
# pip install pycryptodome

from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto import Random

# Part A: Function to generate digital signature
def generate_signature(private_key, message):
    key = RSA.importKey(private_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    signer = PKCS1_v1_5.new(key)
    signature = signer.sign(hashed_message)
    return signature

# Part B: Function to verify digital signature
def verify_signature(public_key, message, signature):
    key = RSA.importKey(public_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    verifier = PKCS1_v1_5.new(key)
    return verifier.verify(hashed_message, signature)

# Generate 2048-bit RSA keys
random_generator = Random.new().read
key_pair = RSA.generate(2048, random_generator)
public_key = key_pair.publickey().export_key()
private_key = key_pair.export_key()

# Sign a message
message = "Hello, World!"
signature = generate_signature(private_key, message)
print("Generated Signature:", signature)

# Verify the signature
is_valid = verify_signature(public_key, message, signature)
print("Signature Verification Result:", is_valid)`
  },

  // =========================================================================
  // PRACTICAL 5
  // =========================================================================
  {
    id: "p05",
    practical_number: 5,
    practical_code: "P05",
    title: "Key Exchange using Diffie-Hellman",
    description: "Implement the Diffie-Hellman key exchange algorithm to securely exchange keys between two entities over an insecure network.",
    language: "python",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "Diffie-Hellman Shared Secret Generation",
        description: "Exchange public parameters and calculate shared symmetric key between Alice and Bob.",
        language: "python",
        code_content: `# Practical No. 5 - Diffie-Hellman Key Exchange
# Aim: Implement the Diffie-Hellman key exchange algorithm.

if __name__ == '__main__':
    # Shared public values (prime P and primitive root G)
    P = 23
    G = 9

    print('The Value of P is:', P)
    print('The Value of G is:', G)

    # 1. Alice selects private secret 'a'
    a = 4
    print('Secret Number for Alice is:', a)
    x = int(pow(G, a, P))  # Alice sends x to Bob

    # 2. Bob selects private secret 'b'
    b = 6
    print('Secret Number for Bob is:', b)
    y = int(pow(G, b, P))  # Bob sends y to Alice

    # 3. Secret key derivation after exchange
    ka = int(pow(y, a, P))  # Alice computes shared key
    kb = int(pow(x, b, P))  # Bob computes shared key

    print('Secret key for the Alice is:', ka)
    print('Secret Key for the Bob is:', kb)
    print('Both keys match:', ka == kb)`
      }
    ],
    code_content: `# Practical No. 5: Key Exchange using Diffie-Hellman
# Aim: To study and implement the Diffie-Hellman key exchange algorithm.

if __name__ == '__main__':
    # Shared public parameters
    P = 23
    G = 9

    print('The Value of P is:', P)
    print('The Value of G is:', G)

    # Alice computes public key
    a = 4
    print('Secret Number for Alice is:', a)
    x = int(pow(G, a, P))

    # Bob computes public key
    b = 6
    print('Secret Number for Bob is:', b)
    y = int(pow(G, b, P))

    # Shared secret key computation
    ka = int(pow(y, a, P))
    kb = int(pow(x, b, P))

    print('Secret key for the Alice is:', ka)
    print('Secret Key for the Bob is:', kb)`
  },

  // =========================================================================
  // PRACTICAL 6
  // =========================================================================
  {
    id: "p06",
    practical_number: 6,
    practical_code: "P06",
    title: "IP Security (IPSec) Configuration",
    description: "Configure IPsec on network devices to provide secure communication and protect against unauthorized access and attacks.",
    language: "cisco-ios",
    install_command: "cisco-packet-tracer",
    install_label: "Requires Cisco Packet Tracer",
    copyable: true,
    is_procedural: true,
    parts: [
      {
        part_code: "Part A",
        title: "Host IP Addressing (PC0 & PC1)",
        description: "Static IPv4 configuration for end-user computers in Cisco Packet Tracer.",
        language: "cisco-ios",
        code_content: `! Part A: Host IP Configuration in Cisco Packet Tracer
! PC0 Settings:
!   IP Address:      192.168.1.2
!   Subnet Mask:     255.255.255.0
!   Default Gateway: 192.168.1.1

! PC1 Settings:
!   IP Address:      192.168.2.2
!   Subnet Mask:     255.255.255.0
!   Default Gateway: 192.168.2.1`
      },
      {
        part_code: "Part B",
        title: "Router Interface Addressing",
        description: "Interface GigabitEthernet configuration for Router0, Router1, and Router2.",
        language: "cisco-ios",
        code_content: `! Part B: Router Interfaces Configuration

! Router0 (Central Core):
Router0> enable
Router0# configure terminal
Router0(config)# interface GigabitEthernet0/0
Router0(config-if)# ip address 20.0.0.2 255.0.0.0
Router0(config-if)# no shutdown
Router0(config-if)# exit
Router0(config)# interface GigabitEthernet0/1
Router0(config-if)# ip address 30.0.0.2 255.0.0.0
Router0(config-if)# no shutdown
Router0(config-if)# exit

! Router1 (Site 1 Gateway):
Router1> enable
Router1# configure terminal
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 20.0.0.1 255.0.0.0
Router1(config-if)# no shutdown
Router1(config-if)# exit
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 192.168.1.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Router2 (Site 2 Gateway):
Router2> enable
Router2# configure terminal
Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# ip address 30.0.0.1 255.0.0.0
Router2(config-if)# no shutdown
Router2(config-if)# exit
Router2(config)# interface GigabitEthernet0/1
Router2(config-if)# ip address 192.168.2.1 255.255.255.0
Router2(config-if)# no shutdown
Router2(config-if)# exit`
      },
      {
        part_code: "Part C",
        title: "IPSec VPN Tunnel Configuration",
        description: "ISAKMP policy, transform-set, access-lists, and crypto map bindings on Router1 and Router2.",
        language: "cisco-ios",
        code_content: `! Part C: IPSec Tunnel Configuration

! On Router1 (Site 1 Gateway):
Router1(config)# crypto isakmp policy 10
Router1(config-isakmp)# encryption aes
Router1(config-isakmp)# hash sha
Router1(config-isakmp)# authentication pre-share
Router1(config-isakmp)# group 2
Router1(config-isakmp)# lifetime 86400
Router1(config-isakmp)# exit
Router1(config)# crypto isakmp key cisco123 address 30.0.0.1
Router1(config)# crypto ipsec transform-set TS esp-aes esp-sha-hmac
Router1(cfg-crypto-trans)# exit
Router1(config)# access-list 101 permit ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255
Router1(config)# crypto map CMAP 10 ipsec-isakmp
Router1(config-crypto-map)# set peer 30.0.0.1
Router1(config-crypto-map)# set transform-set TS
Router1(config-crypto-map)# match address 101
Router1(config-crypto-map)# exit
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# crypto map CMAP
Router1(config-if)# exit

! On Router2 (Site 2 Gateway):
Router2(config)# crypto isakmp policy 10
Router2(config-isakmp)# encryption aes
Router2(config-isakmp)# hash sha
Router2(config-isakmp)# authentication pre-share
Router2(config-isakmp)# group 2
Router2(config-isakmp)# lifetime 86400
Router2(config-isakmp)# exit
Router2(config)# crypto isakmp key cisco123 address 20.0.0.1
Router2(config)# crypto ipsec transform-set TS esp-aes esp-sha-hmac
Router2(cfg-crypto-trans)# exit
Router2(config)# access-list 101 permit ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255
Router2(config)# crypto map CMAP 10 ipsec-isakmp
Router2(config-crypto-map)# set peer 20.0.0.1
Router2(config-crypto-map)# set transform-set TS
Router2(config-crypto-map)# match address 101
Router2(config-crypto-map)# exit
Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# crypto map CMAP
Router2(config-if)# exit

! Verification from PC0 CMD:
! ping 192.168.2.2`
      }
    ],
    code_content: `! Practical No. 6: IP Security (IPSec) Configuration
! Aim: To Configure IPSec on network devices to provide secure communication.

! ==========================================
! 1. Host PC Setup
! ==========================================
! PC0: IP 192.168.1.2 | Mask 255.255.255.0 | Gateway 192.168.1.1
! PC1: IP 192.168.2.2 | Mask 255.255.255.0 | Gateway 192.168.2.1

! ==========================================
! 2. Router Interfaces Setup
! ==========================================
Router0(config)# interface GigabitEthernet0/0
Router0(config-if)# ip address 20.0.0.2 255.0.0.0
Router0(config-if)# no shutdown
Router0(config-if)# exit
Router0(config)# interface GigabitEthernet0/1
Router0(config-if)# ip address 30.0.0.2 255.0.0.0
Router0(config-if)# no shutdown
Router0(config-if)# exit

Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 20.0.0.1 255.0.0.0
Router1(config-if)# no shutdown
Router1(config-if)# exit
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 192.168.1.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# ip address 30.0.0.1 255.0.0.0
Router2(config-if)# no shutdown
Router2(config-if)# exit
Router2(config)# interface GigabitEthernet0/1
Router2(config-if)# ip address 192.168.2.1 255.255.255.0
Router2(config-if)# no shutdown
Router2(config-if)# exit

! ==========================================
! 3. IPSec VPN Tunnel Configurations
! ==========================================
! Router1:
Router1(config)# crypto isakmp policy 10
Router1(config-isakmp)# encryption aes
Router1(config-isakmp)# hash sha
Router1(config-isakmp)# authentication pre-share
Router1(config-isakmp)# group 2
Router1(config-isakmp)# lifetime 86400
Router1(config-isakmp)# exit
Router1(config)# crypto isakmp key cisco123 address 30.0.0.1
Router1(config)# crypto ipsec transform-set TS esp-aes esp-sha-hmac
Router1(cfg-crypto-trans)# exit
Router1(config)# access-list 101 permit ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255
Router1(config)# crypto map CMAP 10 ipsec-isakmp
Router1(config-crypto-map)# set peer 30.0.0.1
Router1(config-crypto-map)# set transform-set TS
Router1(config-crypto-map)# match address 101
Router1(config-crypto-map)# exit
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# crypto map CMAP

! Router2:
Router2(config)# crypto isakmp policy 10
Router2(config-isakmp)# encryption aes
Router2(config-isakmp)# hash sha
Router2(config-isakmp)# authentication pre-share
Router2(config-isakmp)# group 2
Router2(config-isakmp)# lifetime 86400
Router2(config-isakmp)# exit
Router2(config)# crypto isakmp key cisco123 address 20.0.0.1
Router2(config)# crypto ipsec transform-set TS esp-aes esp-sha-hmac
Router2(cfg-crypto-trans)# exit
Router2(config)# access-list 101 permit ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255
Router2(config)# crypto map CMAP 10 ipsec-isakmp
Router2(config-crypto-map)# set peer 20.0.0.1
Router2(config-crypto-map)# set transform-set TS
Router2(config-crypto-map)# match address 101
Router2(config-crypto-map)# exit
Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# crypto map CMAP

! Verification: ping 192.168.2.2`
  },

  // =========================================================================
  // PRACTICAL 7
  // =========================================================================
  {
    id: "p07",
    practical_number: 7,
    practical_code: "P07",
    title: "Web Security with SSL/TLS",
    description: "Configure and implement secure web communication using SSL/TLS protocols, including certificate management and secure session establishment.",
    language: "python",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "SSL/TLS Secure Socket Connection",
        description: "Connect to HTTPS web server over TLS port 443 and retrieve encrypted HTTP response.",
        language: "python",
        code_content: `# Practical No. 7 - Part A: SSL/TLS Secure Socket Connection
# Aim: Web Security with SSL/TLS

import ssl
import socket

# 1. Create default secure SSL context
context = ssl.create_default_context()

# 2. Create standard TCP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 3. Wrap socket with SSL context
ssl_sock = context.wrap_socket(sock, server_hostname='example.com')

# 4. Connect to server on HTTPS port 443
ssl_sock.connect(('example.com', 443))

# 5. Send HTTP GET request over encrypted TLS tunnel
request = b'GET / HTTP/1.1\\r\\nHost: example.com\\r\\nConnection: close\\r\\n\\r\\n'
ssl_sock.sendall(request)

# 6. Read and print response
response = ssl_sock.recv(1024)
print(response.decode())

# 7. Close secure socket
ssl_sock.close()`
      }
    ],
    code_content: `# Practical No. 7: Web Security with SSL/TLS
# Aim: Configure and implement secure web communication using SSL/TLS protocols.

import ssl
import socket

# Create a default SSL context
context = ssl.create_default_context()

# Create a socket
sock = socket.socket(socket.AF_INET)

# Wrap the socket with the SSL context
ssl_sock = context.wrap_socket(sock, server_hostname='example.com')

# Connect to the server
ssl_sock.connect(('example.com', 443))

# Send a request
ssl_sock.sendall(b'GET / HTTP/1.1\\r\\nHost: example.com\\r\\nConnection: close\\r\\n\\r\\n')

# Receive the response
response = ssl_sock.recv(1024)
print(response.decode())

# Close the socket
ssl_sock.close()`
  },

  // =========================================================================
  // PRACTICAL 8
  // =========================================================================
  {
    id: "p08",
    practical_number: 8,
    practical_code: "P08",
    title: "Intrusion Detection System",
    description: "Setup and configure an intrusion detection(IDS) to monitor network traffic and detect potential security breaches or malicious activities.",
    language: "python",
    install_command: "pip install opencv-python numpy",
    install_label: "Install OpenCV & NumPy",
    copyable: true,
    parts: [
      {
        part_code: "Part A",
        title: "Image Preprocessing & Morphological Filtering",
        description: "Grayscale conversion, binary inversion thresholding, erosion, and dilation.",
        language: "python",
        code_content: `# Practical No. 8 - Part A: Image Thresholding & Morphological Filtering
# CMD: pip install opencv-python numpy

import cv2
import numpy as np

# Load test frame
img = cv2.imread('download.jpeg')
if img is None:
    img = np.zeros((400, 600, 3), dtype=np.uint8)
    cv2.rectangle(img, (150, 100), (350, 220), (255, 255, 255), -1)

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply thresholding
thresh = cv2.threshold(gray, 170, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# Define kernel & morphology
kernel = np.ones((10, 10), np.uint8)
eroded = cv2.erode(thresh, kernel, iterations=2)
dilated = cv2.dilate(eroded, kernel, iterations=2)`
      },
      {
        part_code: "Part B",
        title: "Contour Analysis & Intrusion Alerting",
        description: "Find contours, calculate aspect ratio and bounding area, and draw intrusion bounding box.",
        language: "python",
        code_content: `# Practical No. 8 - Part B: Contour Detection & Intrusion Alert
# CMD: pip install opencv-python numpy

# Find contours in dilated image
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
intrusion_detected = False

for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    aspect_ratio = float(w) / h
    area = cv2.contourArea(contour)

    # Intrusion criteria
    if aspect_ratio > 1.5 and area > 500:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        print(f"Intrusion detected at location: ({x}, {y}) with width: {w} and height: {h}")
        intrusion_detected = True

# Display result
cv2.namedWindow("Intrusion Detected!!", cv2.WINDOW_NORMAL)
height, width = img.shape[:2]
cv2.resizeWindow("Intrusion Detected!!", width, height)
cv2.imshow("Intrusion Detected!!", img)
cv2.imwrite("output.jpg", img)

if intrusion_detected:
    print("Intrusion Detected")
else:
    print("No intrusion detected.")

cv2.waitKey(0)
cv2.destroyAllWindows()`
      }
    ],
    code_content: `# Practical No. 8: Intrusion Detection System
# Aim: Setup and configure an intrusion detection(IDS) using OpenCV.
#
# CMD Command to Install Libraries:
# pip install opencv-python numpy

import cv2
import numpy as np

# Load the image
img = cv2.imread('download.jpeg')
if img is None:
    img = np.zeros((400, 600, 3), dtype=np.uint8)
    cv2.rectangle(img, (150, 100), (350, 220), (255, 255, 255), -1)

# Convert to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Apply thresholding to highlight potential intrusions
thresh = cv2.threshold(gray, 170, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

# Define a kernel for morphological operations
kernel = np.ones((10, 10), np.uint8)

# Erode to remove small noise points, then dilate to close gaps in contours
eroded = cv2.erode(thresh, kernel, iterations=2)
dilated = cv2.dilate(eroded, kernel, iterations=2)

# Find contours in the dilated image
contours, _ = cv2.findContours(dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Flag to check if any intrusion is detected
intrusion_detected = False

# Process each contour
for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)
    aspect_ratio = float(w) / h
    area = cv2.contourArea(contour)

    # Define criteria for an intrusion
    if aspect_ratio > 1.5 and area > 500:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        print(f"Intrusion detected at location: ({x}, {y}) with width: {w} and height: {h}")
        intrusion_detected = True

# Display the result
cv2.namedWindow("Intrusion Detected!!", cv2.WINDOW_NORMAL)
height, width = img.shape[:2]
cv2.resizeWindow("Intrusion Detected!!", width, height)
cv2.imshow("Intrusion Detected!!", img)

# Save the output image
cv2.imwrite("output.jpg", img)

# Inform the user if no intrusions were detected
if intrusion_detected:
    print("Intrusion Detected")
else:
    print("No intrusion detected.")

# Wait for a key press and close all windows
cv2.waitKey(0)
cv2.destroyAllWindows()`
  },

  // =========================================================================
  // PRACTICAL 9
  // =========================================================================
  {
    id: "p09",
    practical_number: 9,
    practical_code: "P09",
    title: "Malware Analysis and Detection",
    description: "Analyze and Identify malware samples using antivirus tools, analyze their behavior and develop counter measures to mitigate their impact.",
    language: "procedural",
    install_command: "certutil -hashfile sample.zip SHA256",
    install_label: "CMD Hash Extraction",
    copyable: true,
    is_procedural: true,
    parts: [
      {
        part_code: "Part A",
        title: "Malware Sample Hash Calculation (CMD)",
        description: "Exact Windows Command Prompt commands to compute MD5 and SHA-256 cryptographic hashes.",
        language: "cmd",
        code_content: `REM Practical 9 - Part A: Hash Calculation via Windows Command Prompt

REM 1. Compute SHA-256 hash of the downloaded sample:
certutil -hashfile sample.zip SHA256

REM 2. Compute MD5 hash of the downloaded sample:
certutil -hashfile sample.zip MD5

REM 3. Compute SHA-1 hash of the downloaded sample:
certutil -hashfile sample.zip SHA1`
      },
      {
        part_code: "Part B",
        title: "VirusTotal & VirusShare Analysis Workflow",
        description: "Step-by-step procedures for cloud multi-vendor antivirus scanning.",
        language: "text",
        code_content: `Practical 9 - Part B: Lab Procedure for Malware Analysis

Step 1: Download Benign Malware Hash Set
  - Open: https://www.virusshare.com
  - Download test archive (e.g. VirusShare_0-475_MD4toS_Hash_Sets_Autopsy_2023_Q2.zip).

Step 2: Submit to Multi-Engine Threat Scanner
  - Open: https://www.virustotal.com
  - Select "FILE" tab -> Click "Choose File" -> Select downloaded sample.

Step 3: Document Threat Signatures & Hashes
  - MD5:    140e577f664a6d4ca98feaa5071129e1
  - SHA1:   6257b760b14ce27b05dafe72df1fa88ff53ad7
  - SHA256: 607028ed18401aadc3295090d8ff03e1e2cf068692343cb3755465c238
  - File Architecture: PE32 executable for MS Windows
  - Evaluate vendor detection ratio across 70+ security engines.`
      }
    ],
    code_content: `# ==============================================================================
# Practical No. 9: Malware Analysis and Detection
# Aim: Analyze and Identify malware samples using antivirus tools.
# ==============================================================================

# PART A: Windows CMD Hash Extraction Commands
# Run these in Command Prompt to obtain hashes for verification:
# certutil -hashfile sample.zip SHA256
# certutil -hashfile sample.zip MD5

# PART B: Step-by-Step Lab Procedure
# Step 1: Download malware archive sample from https://www.virusshare.com
# Step 2: Upload sample to multi-engine scanner at https://www.virustotal.com
# Step 3: Inspect detection metrics (Detection tab, Details tab, Behavior analysis)
#
# Lab Sample Cryptographic Hashes:
# MD5:    140e577f664a6d4ca98feaa5071129e1
# SHA1:   6257b760b14ce27b05dafe72df1fa88ff53ad7
# SHA256: 607028ed18401aadc3295090d8ff03e1e2cf068692343cb3755465c238`
  },

  // =========================================================================
  // PRACTICAL 10
  // =========================================================================
  {
    id: "p10",
    practical_number: 10,
    practical_code: "P10",
    title: "Firewall Configuration and Rule-based Filtering",
    description: "Configure and test firewall rules to control network traffic, filter packets based on specified criteria, and protect network resources from unauthorized access.",
    language: "cmd",
    install_command: "nslookup android.com",
    install_label: "CMD DNS Lookup",
    copyable: true,
    is_procedural: true,
    parts: [
      {
        part_code: "Part A",
        title: "Port-Based Firewall Rules (Ports 80 & 443)",
        description: "Block HTTP (port 80) and HTTPS (port 443) inbound and outbound traffic via netsh.",
        language: "cmd",
        code_content: `REM Practical 10 - Part A: Port-Based Rule (Block HTTP 80 / HTTPS 443)
REM Run Command Prompt as Administrator

REM 1. Create Inbound Rule to Block TCP Ports 80 and 443
netsh advfirewall firewall add rule name="httpblock" dir=in action=block protocol=TCP localport=80,443 profile=any

REM 2. Create Outbound Rule to Block TCP Ports 80 and 443
netsh advfirewall firewall add rule name="httpblock" dir=out action=block protocol=TCP remoteport=80,443 profile=any`
      },
      {
        part_code: "Part B",
        title: "IP-Based Domain Blocking (android.com)",
        description: "Query DNS via nslookup and block destination IPv4 and IPv6 addresses.",
        language: "cmd",
        code_content: `REM Practical 10 - Part B: IP-Based Rule (Block android.com)
REM Run Command Prompt as Administrator

REM Step 1: Resolve Target Domain IP addresses
nslookup android.com

REM Target IP Addresses from lab:
REM 142.250.71.100 (IPv4)
REM 2404:6800:4009:806::2004 (IPv6)

REM Step 2: Create Inbound Rule to Block Target IP Addresses
netsh advfirewall firewall add rule name="block android" dir=in action=block remoteip=142.250.71.100,2404:6800:4009:806::2004 profile=any

REM Step 3: Create Outbound Rule to Block Target IP Addresses
netsh advfirewall firewall add rule name="block android" dir=out action=block remoteip=142.250.71.100,2404:6800:4009:806::2004 profile=any

REM Step 4: Verification
REM Open browser and visit http://www.android.com
REM Result: "This site can't be reached" (Traffic Blocked by Windows Firewall)`
      }
    ],
    code_content: `@echo off
REM ============================================================================
REM Practical No. 10: Firewall Configuration and Rule-based Filtering
REM Aim: Configure and test firewall rules to control network traffic.
REM ============================================================================

REM ----------------------------------------------------------------------------
REM PART A: Port-Based Rule - Blocking Web Traffic (Ports 80 & 443)
REM ----------------------------------------------------------------------------
netsh advfirewall firewall add rule name="httpblock" dir=in action=block protocol=TCP localport=80,443 profile=any
netsh advfirewall firewall add rule name="httpblock" dir=out action=block protocol=TCP remoteport=80,443 profile=any

REM ----------------------------------------------------------------------------
REM PART B: IP-Based Rule - Blocking Specific Website (android.com)
REM ----------------------------------------------------------------------------
REM 1. DNS Resolution:
nslookup android.com

REM 2. Block Target IP Addresses:
netsh advfirewall firewall add rule name="block android" dir=in action=block remoteip=142.250.71.100,2404:6800:4009:806::2004 profile=any
netsh advfirewall firewall add rule name="block android" dir=out action=block remoteip=142.250.71.100,2404:6800:4009:806::2004 profile=any`
  }
];
