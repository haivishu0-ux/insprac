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
  parts?: PracticalPart[]; // Only P01 has two parts
  code_content: string;
  copyable: boolean;
  created_at?: string;
  updated_at?: string;
}

export const PRACTICALS_DATA: Practical[] = [
  // =========================================================================
  // PRACTICAL 1: Substitution and Transposition Cipher (Has 2 Parts)
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
        description: "Monoalphabetic substitution mapping each character to a key alphabet.",
        language: "python",
        code_content: `class SubstitutionCipher:
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


key = "welkfghlserigherispagjuoiphetopsasd"
sub_cipher = SubstitutionCipher(key)
message = "Hello World!"
encrypted_message = sub_cipher.encrypt(message)
decrypted_message = sub_cipher.decrypt(encrypted_message)

print("Original: ", message)
print("Encrypted: ", encrypted_message)
print("Decrypted: ", decrypted_message)`
      },
      {
        part_code: "Part B",
        title: "Transposition Cipher",
        description: "Columnar transposition cipher shuffling character order based on key permutation.",
        language: "python",
        code_content: `class TranspositionCipher:
    def __init__(self, key):
        self.key = key

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


# Example usage:
key = "4312567"
trans_cipher = TranspositionCipher(key)
message = "Hello World!"
encrypted_message = trans_cipher.encrypt(message)
decrypted_message = trans_cipher.decrypt(encrypted_message)

print("Original:", message)
print("Encrypted:", encrypted_message)
print("Decrypted:", decrypted_message)`
      }
    ],
    code_content: `# ==========================================
# Practical No. 1 - Substitution and Transposition Cipher
# ==========================================

# Part A: Substitution Cipher
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


key = "welkfghlserigherispagjuoiphetopsasd"
sub_cipher = SubstitutionCipher(key)
message = "Hello World!"
encrypted_message = sub_cipher.encrypt(message)
decrypted_message = sub_cipher.decrypt(encrypted_message)

print("--- Part A: Substitution Cipher ---")
print("Original: ", message)
print("Encrypted: ", encrypted_message)
print("Decrypted: ", decrypted_message)
print()


# Part B: Transposition Cipher
class TranspositionCipher:
    def __init__(self, key):
        self.key = key

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
  // PRACTICAL 2: RSA Encryption and Decryption (Single Part)
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
    code_content: `from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

keyPair = RSA.generate(1024)

pubkey = keyPair.publickey()
print(f"Public key: (n={hex(pubkey.n)} , e={hex(pubkey.e)} )")
pubkeyPEM = pubkey.export_key()
print(pubkeyPEM.decode('ascii'))

print(f"Private key: (n={hex(pubkey.n)} , d={hex(keyPair.d)} )")
privkeyPEM = keyPair.export_key()
print(privkeyPEM.decode('ascii'))

msg = b'IsmileAcademy'
encryptor = PKCS1_OAEP.new(pubkey)
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted).decode('ascii'))

# Decryption:
decryptor = PKCS1_OAEP.new(keyPair)
decrypted = decryptor.decrypt(encrypted)
print("Decrypted:", decrypted.decode('ascii'))`
  },

  // =========================================================================
  // PRACTICAL 3: Message Authentication Codes (Single Part)
  // =========================================================================
  {
    id: "p03",
    practical_number: 3,
    practical_code: "P03",
    title: "Message Authentication Codes",
    description: "Implement algorithm to generate and verify message authentication codes(MACs) for ensuring data integrity and authenticity of digitally signed message.",
    language: "python",
    copyable: true,
    code_content: `import hashlib

result1 = hashlib.md5(b'Esmile')
result2 = hashlib.md5(b'Niranjan')

print("The byte equivalent of hash is: ", end="")
print(result1.digest())

print("The byte equivalent of hash is: ", end="")
print(result2.digest())`
  },

  // =========================================================================
  // PRACTICAL 4: Digital Signature (Single Part)
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
    code_content: `from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto import Random

def generate_signature(private_key, message):
    key = RSA.importKey(private_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    signer = PKCS1_v1_5.new(key)
    signature = signer.sign(hashed_message)
    return signature

def verify_signature(public_key, message, signature):
    key = RSA.importKey(public_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    verifier = PKCS1_v1_5.new(key)
    return verifier.verify(hashed_message, signature)

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
  // PRACTICAL 5: Key Exchange using Diffie-Hellman (Single Part)
  // =========================================================================
  {
    id: "p05",
    practical_number: 5,
    practical_code: "P05",
    title: "Key Exchange using Diffie-Hellman",
    description: "Implement the Diffie-Hellman key exchange algorithm to securely exchange keys between two entities over an insecure network.",
    language: "python",
    copyable: true,
    code_content: `from random import randint

if __name__ == '__main__':
    P = 23
    G = 9

    print('The Value of P is:', P)
    print('The Value of G is:', G)

    a = 4
    print('Secret Number for Alice is:', a)
    x = int(pow(G, a, P))

    b = 6
    print('Secret Number for Bob is:', b)
    y = int(pow(G, b, P))

    ka = int(pow(y, a, P))
    kb = int(pow(x, b, P))

    print('Secret key for the Alice is:', ka)
    print('Secret Key for the Bob is:', kb)`
  },

  // =========================================================================
  // PRACTICAL 7: Web Security with SSL/TLS (Single Part)
  // =========================================================================
  {
    id: "p07",
    practical_number: 7,
    practical_code: "P07",
    title: "Web Security with SSL/TLS",
    description: "Configure and implement secure web communication using SSL/TLS protocols, including certificate management and secure session establishment.",
    language: "python",
    copyable: true,
    code_content: `import ssl
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
ssl_sock.sendall(b'GET / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n')

# Receive the response
response = ssl_sock.recv(1024)
print(response.decode())

# Close the socket
ssl_sock.close()`
  },

  // =========================================================================
  // PRACTICAL 8: Intrusion Detection System (User Provided Code - Single Part)
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
    code_content: `import cv2
import numpy as np


img = np.zeros((400, 600, 3), dtype=np.uint8)
cv2.rectangle(img, (150, 100), (400, 220), (255, 255, 255), -1)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)


thresh = cv2.threshold(gray, 170, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

kernel = np.ones((10, 10), np.uint8)

eroded = cv2.erode(thresh, kernel, iterations=1)
dilated = cv2.dilate(eroded, kernel, iterations=2)

contours, _ = cv2.findContours(
    dilated, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
)

detected = False

for contour in contours:
    x, y, w, h = cv2.boundingRect(contour)

    aspect_ratio = w / float(h)
    area = cv2.contourArea(contour)

    if aspect_ratio > 1.5 and area > 500:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        print("Intrusion Detected at:", x, y)
        detected = True

if detected:
    print("Intrusion Detected")
else:
    print("No intrusion detected")

cv2.imshow("Original Image", img)
cv2.imwrite("output.jpg", img)

cv2.waitKey(0)
cv2.destroyAllWindows()`
  }
];
