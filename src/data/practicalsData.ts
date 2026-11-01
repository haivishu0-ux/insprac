export interface Practical {
  id: string;
  practical_number: number;
  practical_code: string;
  title: string;
  description: string;
  language: string;
  code_content: string;
  copyable: boolean;
  is_procedural?: boolean;
  created_at?: string;
  updated_at?: string;
}

export const PRACTICALS_DATA: Practical[] = [
  {
    id: "p01",
    practical_number: 1,
    practical_code: "P01",
    title: "Substitution and Transposition Cipher",
    description: "Design and implement algorithms to encrypt and decrypt messages using classical substitution and transposition techniques.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 1
# Aim: To study and implement Substitution Cipher and Transposition Cipher.

# ==========================================
# Part 1: Substitution Cipher Implementation
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


# Example Execution - Substitution Cipher
key_sub = "welkfghlserigherispagjuoiphetopsasd"
sub_cipher = SubstitutionCipher(key_sub)
message = "Hello World!"

encrypted_sub = sub_cipher.encrypt(message)
decrypted_sub = sub_cipher.decrypt(encrypted_sub)

print("--- Substitution Cipher ---")
print("Original: ", message)
print("Encrypted: ", encrypted_sub)
print("Decrypted: ", decrypted_sub)
print()


# ===========================================
# Part 2: Transposition Cipher Implementation
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


# Example Execution - Transposition Cipher
key_trans = "4312567"
trans_cipher = TranspositionCipher(key_trans)
message_trans = "Hello World!"

encrypted_trans = trans_cipher.encrypt(message_trans)
decrypted_trans = trans_cipher.decrypt(encrypted_trans)

print("--- Transposition Cipher ---")
print("Original: ", message_trans)
print("Encrypted: ", encrypted_trans)
print("Decrypted: ", decrypted_trans)`
  },
  {
    id: "p02",
    practical_number: 2,
    practical_code: "P02",
    title: "RSA Encryption and Decryption",
    description: "Implementing the RSA algorithm for public-key encryption and decryption, and explore its properties and security considerations.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 2
# Aim: To study and implement the RSA algorithm for public-key encryption and decryption, 
# and explore its properties and security considerations.
#
# Requirements:
# pip install pycryptodome

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

# Step 1: Generate RSA Key Pair (1024-bit)
keyPair = RSA.generate(1024)

# Export and display public key
pubkey = keyPair.publickey()
print(f"Public key: (n={hex(pubkey.n)} , e={hex(pubkey.e)} )")
pubkeyPEM = pubkey.export_key()
print(pubkeyPEM.decode('ascii'))

# Export and display private key
print(f"Private key: (n={hex(pubkey.n)} , d={hex(keyPair.d)} )")
privkeyPEM = keyPair.export_key()
print(privkeyPEM.decode('ascii'))

# Step 2: RSA Encryption
msg = b'IsmileAcademy'
encryptor = PKCS1_OAEP.new(pubkey)
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted).decode('ascii'))

# Step 3: RSA Decryption
decryptor = PKCS1_OAEP.new(keyPair)
decrypted = decryptor.decrypt(encrypted)
print("Decrypted:", decrypted.decode('ascii'))`
  },
  {
    id: "p03",
    practical_number: 3,
    practical_code: "P03",
    title: "Message Authentication Codes",
    description: "Implement algorithm to generate and verify message authentication codes(MACs) for ensuring data integrity and authenticity of digitally signed message.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 3
# Aim: To study and implement the Message Authentication Code for ensuring the message 
# integrity and authenticity.

import hashlib

# Generate MD5 hash for given byte strings
result1 = hashlib.md5(b'Esmile')
result2 = hashlib.md5(b'Niranjan')

# Byte representation output as shown in manual
print("The byte equivalent of hash is: ", end="")
print(result1.digest())

print("The byte equivalent of hash is: ", end="")
print(result2.digest())

# Hexadecimal representation
print("\nHexadecimal digest values:")
print("Hash 1 (Esmile):", result1.hexdigest())
print("Hash 2 (Niranjan):", result2.hexdigest())`
  },
  {
    id: "p04",
    practical_number: 4,
    practical_code: "P04",
    title: "Digital Signature",
    description: "Implement Digital Signature Algorithms such as RSA-based signature, and verify the integrity and authenticity of digitally signed messages.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 4
# Aim: To study and implement the Digital Signature algorithm.
#
# Requirements:
# pip install pycryptodome

from Crypto.Signature import PKCS1_v1_5
from Crypto.Hash import SHA256
from Crypto.PublicKey import RSA
from Crypto import Random

# Function to generate digital signature
def generate_signature(private_key, message):
    key = RSA.importKey(private_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    signer = PKCS1_v1_5.new(key)
    signature = signer.sign(hashed_message)
    return signature

# Function to verify digital signature
def verify_signature(public_key, message, signature):
    key = RSA.importKey(public_key)
    hashed_message = SHA256.new(message.encode('utf-8'))
    verifier = PKCS1_v1_5.new(key)
    return verifier.verify(hashed_message, signature)

# Generate 2048-bit RSA keys for signing
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
  {
    id: "p05",
    practical_number: 5,
    practical_code: "P05",
    title: "Key Exchange using Diffie-Hellman",
    description: "Implement the Diffie-Hellman key exchange algorithm to securely exchange keys between two entities over an insecure network.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 5
# Aim: To study and implement the Diffie-Hellman key exchange algorithm for secure 
# exchange of keys between two entities.

from random import randint

if __name__ == '__main__':
    # Shared public prime modulus P and base generator G
    P = 23
    G = 9

    print('The Value of P is:', P)
    print('The Value of G is:', G)

    # Alice selects private secret number 'a'
    a = 4
    print('Secret Number for Alice is:', a)
    x = int(pow(G, a, P))  # Alice computes public value x = (G^a) mod P

    # Bob selects private secret number 'b'
    b = 6
    print('Secret Number for Bob is:', b)
    y = int(pow(G, b, P))  # Bob computes public value y = (G^b) mod P

    # Secret key calculation after exchange
    ka = int(pow(y, a, P))  # Alice computes key = (y^a) mod P
    kb = int(pow(x, b, P))  # Bob computes key = (x^b) mod P

    print('Secret key for the Alice is:', ka)
    print('Secret Key for the Bob is:', kb)`
  },
  {
    id: "p06",
    practical_number: 6,
    practical_code: "P06",
    title: "IP Security (IPSec) Configuration",
    description: "Configure IPsec on network devices to provide secure communication and protect against unauthorized access and attacks.",
    language: "cisco-ios",
    copyable: true,
    is_procedural: true,
    code_content: `! ==============================================================================
! Practical No. 6: IP Security (IPSec) Configuration
! Aim: To Configure IPSec on network devices to provide secure communication
!      and protect against unauthorized access and attacks.
! Topology: PC0 -> Switch0 -> Router1 -> Router0 -> Router2 -> Switch1 -> PC1
! ==============================================================================

! ------------------------------------------------------------------------------
! 1. End Device IP Address Settings (Cisco Packet Tracer)
! ------------------------------------------------------------------------------
! PC0 Configuration:
!   IPv4 Address:    192.168.1.2
!   Subnet Mask:     255.255.255.0
!   Default Gateway: 192.168.1.1

! PC1 Configuration:
!   IPv4 Address:    192.168.2.2
!   Subnet Mask:     255.255.255.0
!   Default Gateway: 192.168.2.1

! ------------------------------------------------------------------------------
! 2. Configure Router0 (Intermediate WAN Router)
! ------------------------------------------------------------------------------
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

! ------------------------------------------------------------------------------
! 3. Configure Router1 (Site 1 Gateway)
! ------------------------------------------------------------------------------
Router1> enable
Router1# configure terminal

! Configure GigabitEthernet0/0 (WAN interface towards Router0)
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# ip address 20.0.0.1 255.0.0.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Configure GigabitEthernet0/1 (LAN interface towards Switch0 / PC0)
Router1(config)# interface GigabitEthernet0/1
Router1(config-if)# ip address 192.168.1.1 255.255.255.0
Router1(config-if)# no shutdown
Router1(config-if)# exit

! Configure IPSec ISAKMP Policy
Router1(config)# crypto isakmp policy 10
Router1(config-isakmp)# encryption aes
Router1(config-isakmp)# hash sha
Router1(config-isakmp)# authentication pre-share
Router1(config-isakmp)# group 2
Router1(config-isakmp)# lifetime 86400
Router1(config-isakmp)# exit

! Pre-shared key for Router2 peer
Router1(config)# crypto isakmp key cisco123 address 30.0.0.1

! Define Transform Set
Router1(config)# crypto ipsec transform-set TS esp-aes esp-sha-hmac
Router1(cfg-crypto-trans)# exit

! Interesting Traffic Access Control List
Router1(config)# access-list 101 permit ip 192.168.1.0 0.0.0.255 192.168.2.0 0.0.0.255

! Map crypto configuration to Crypto Map
Router1(config)# crypto map CMAP 10 ipsec-isakmp
Router1(config-crypto-map)# set peer 30.0.0.1
Router1(config-crypto-map)# set transform-set TS
Router1(config-crypto-map)# match address 101
Router1(config-crypto-map)# exit

! Apply Crypto Map to Outgoing WAN Interface
Router1(config)# interface GigabitEthernet0/0
Router1(config-if)# crypto map CMAP
Router1(config-if)# exit

! ------------------------------------------------------------------------------
! 4. Configure Router2 (Site 2 Gateway)
! ------------------------------------------------------------------------------
Router2> enable
Router2# configure terminal

! Configure GigabitEthernet0/0 (WAN interface towards Router0)
Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# ip address 30.0.0.1 255.0.0.0
Router2(config-if)# no shutdown
Router2(config-if)# exit

! Configure GigabitEthernet0/1 (LAN interface towards Switch1 / PC1)
Router2(config)# interface GigabitEthernet0/1
Router2(config-if)# ip address 192.168.2.1 255.255.255.0
Router2(config-if)# no shutdown
Router2(config-if)# exit

! Configure IPSec ISAKMP Policy
Router2(config)# crypto isakmp policy 10
Router2(config-isakmp)# encryption aes
Router2(config-isakmp)# hash sha
Router2(config-isakmp)# authentication pre-share
Router2(config-isakmp)# group 2
Router2(config-isakmp)# lifetime 86400
Router2(config-isakmp)# exit

! Pre-shared key for Router1 peer
Router2(config)# crypto isakmp key cisco123 address 20.0.0.1

! Define Transform Set
Router2(config)# crypto ipsec transform-set TS esp-aes esp-sha-hmac
Router2(cfg-crypto-trans)# exit

! Interesting Traffic Access Control List
Router2(config)# access-list 101 permit ip 192.168.2.0 0.0.0.255 192.168.1.0 0.0.0.255

! Map crypto configuration to Crypto Map
Router2(config)# crypto map CMAP 10 ipsec-isakmp
Router2(config-crypto-map)# set peer 20.0.0.1
Router2(config-crypto-map)# set transform-set TS
Router2(config-crypto-map)# match address 101
Router2(config-crypto-map)# exit

! Apply Crypto Map to Outgoing WAN Interface
Router2(config)# interface GigabitEthernet0/0
Router2(config-if)# crypto map CMAP
Router2(config-if)# exit

! ------------------------------------------------------------------------------
! 5. Verification: Test Connectivity in Cisco Packet Tracer PC Command Prompt
! ------------------------------------------------------------------------------
! From PC0:
ping 192.168.2.2

! From PC1:
ping 192.168.1.2`
  },
  {
    id: "p07",
    practical_number: 7,
    practical_code: "P07",
    title: "Web Security with SSL/TLS",
    description: "Configure and implement secure web communication using SSL/TLS protocols, including certificate management and secure session establishment.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 7
# Aim: Web Security with SSL/TLS: Configure and implement secure web communication 
# using SSL/TLS protocols, including certificate management and secure session establishment.

import ssl
import socket

# Create a default SSL context
context = ssl.create_default_context()

# Create a socket
sock = socket.socket(socket.AF_INET)

# Wrap the socket with the SSL context
ssl_sock = context.wrap_socket(sock, server_hostname='example.com')

# Connect to the server over port 443 (HTTPS)
ssl_sock.connect(('example.com', 443))

# Send an HTTP GET request
ssl_sock.sendall(b'GET / HTTP/1.1\\r\\nHost: example.com\\r\\nConnection: close\\r\\n\\r\\n')

# Receive the response
response = ssl_sock.recv(1024)
print(response.decode())

# Close the socket
ssl_sock.close()`
  },
  {
    id: "p08",
    practical_number: 8,
    practical_code: "P08",
    title: "Intrusion Detection System",
    description: "Setup and configure an intrusion detection(IDS) to monitor network traffic and detect potential security breaches or malicious activities.",
    language: "python",
    copyable: true,
    code_content: `# Practical No. 8
# Aim: Intrusion Detection System: Setup and configure an intrusion detection(IDS) 
# to monitor network traffic and detect potential security breaches or malicious activities.
#
# Requirements:
# pip install opencv-python numpy

import cv2
import numpy as np

# Load the image
img = cv2.imread('download.jpeg')
if img is None:
    # Fallback canvas if download.jpeg is not present locally
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
        # Draw a green bounding box around detected intrusion
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
  {
    id: "p09",
    practical_number: 9,
    practical_code: "P09",
    title: "Malware Analysis and Detection",
    description: "Analyze and Identify malware samples using antivirus tools, analyze their behavior and develop counter measures to mitigate their impact.",
    language: "procedural",
    copyable: true,
    is_procedural: true,
    code_content: `# ==============================================================================
# Practical No. 9: Malware Analysis and Detection
# Aim: Analyze and Identify malware samples using antivirus tools, analyze their 
#      behavior and develop counter measures to mitigate their impact.
# ==============================================================================
# NOTE: In accordance with the official lab syllabus, this practical is a 
# procedural investigation performed using security portals (VirusShare & VirusTotal).
# No standalone Python script is provided in the source manual.
# ==============================================================================

STEP-BY-STEP LAB PROCEDURE:

Step 1: Download Clean Sample of Malware
  - Visit the sample repository portal: https://www.virusshare.com
  - Authenticate or search for verified hash sets and benign test samples.

Step 2: Obtain Archive
  - Download the sample file in ZIP format to your isolated sandbox machine.
  - (Example package from lab: VirusShare_0-475_MD4toS_Hash_Sets_Autopsy_2023_Q2.zip).

Step 3: Access Multi-Engine Analysis Engine
  - Open a web browser and navigate to:
    https://www.virustotal.com

Step 4: Upload and Analyze Sample
  - On the VirusTotal homepage, click "FILE".
  - Click "Choose File" and select the sample file from your local storage.
  - VirusTotal scans the hash across 70+ antivirus engines 
    (Acronis, BitDefender, Microsoft Defender, Kaspersky, Sophos, Symantec, CrowdStrike).

Step 5: Review Results and Technical Metrics
  - Community & Detection ratio: e.g. 0/70 (Undetected) or positive detections.
  - Record the cryptographic hash values:
      * MD5:    140e577f664a6d4ca98feaa5071129e1
      * SHA1:   6257b760b14ce27b05dafe72df1fa88ff53ad7
      * SHA256: 607028ed18401aadc3295090d8ff03e1e2cf068692343cb3755465c238
  - File Attributes: PE32 executable (GUI) Intel 80386, for MS Windows.
  - Identify behavioral indicators to configure appropriate endpoint defenses.`
  },
  {
    id: "p10",
    practical_number: 10,
    practical_code: "P10",
    title: "Firewall Configuration and Rule-based Filtering",
    description: "Configure and test firewall rules to control network traffic, filter packets based on specified criteria, and protect network resources from unauthorized access.",
    language: "powershell / cmd",
    copyable: true,
    is_procedural: true,
    code_content: `@echo off
REM ============================================================================
REM Practical No. 10: Firewall Configuration and Rule-based Filtering
REM Aim: Configure and test firewall rules to control network traffic, filter 
REM      packets based on specified criteria, and protect network resources from 
REM      unauthorized access.
REM ============================================================================

REM ----------------------------------------------------------------------------
REM Step 1: DNS Resolution to identify target IP addresses (as shown in lab manual)
REM ----------------------------------------------------------------------------
nslookup android.com

REM Non-authoritative output from lab manual:
REM Addresses: 2404:6800:4009:806::2004 (IPv6)
REM            142.250.71.100           (IPv4)

REM ----------------------------------------------------------------------------
REM PART A: Port-Based Rule - Blocking Web Traffic (Ports 80 and 443)
REM ----------------------------------------------------------------------------

REM 1. Create Inbound Rule to Block TCP Ports 80, 443:
netsh advfirewall firewall add rule name="httpblock" dir=in action=block protocol=TCP localport=80,443 profile=any

REM 2. Create Outbound Rule to Block TCP Ports 80, 443:
netsh advfirewall firewall add rule name="httpblock" dir=out action=block protocol=TCP remoteport=80,443 profile=any

REM ----------------------------------------------------------------------------
REM PART B: IP-Based Rule - Blocking Specific Website (android.com)
REM ----------------------------------------------------------------------------

REM 1. Create Inbound Rule to block traffic from target IP addresses:
netsh advfirewall firewall add rule name="block android" dir=in action=block remoteip=142.250.71.100,2404:6800:4009:806::2004 profile=any

REM 2. Create Outbound Rule to block traffic to target IP addresses:
netsh advfirewall firewall add rule name="block android" dir=out action=block remoteip=142.250.71.100,2404:6800:4009:806::2004 profile=any

REM ----------------------------------------------------------------------------
REM Verification:
REM Open browser and visit: http://www.android.com
REM Output: "This site can't be reached" (Access Blocked by Firewall)
REM ----------------------------------------------------------------------------

REM Optional cleanup commands after testing:
REM netsh advfirewall firewall delete rule name="httpblock"
REM netsh advfirewall firewall delete rule name="block android"`
  }
];
