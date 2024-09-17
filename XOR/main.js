// Convert string to binary
function stringToBinary(str) {
    return str.split('').map(function(char) {
        return char.charCodeAt(0).toString(2).padStart(8, '0');  // Convert to 8-bit binary
    }).join('');
}

// Convert binary back to string
function binaryToString(bin) {
    let binaryArray = bin.match(/.{1,8}/g);  // Split binary into 8-bit chunks
    return binaryArray.map(function(binChar) {
        return String.fromCharCode(parseInt(binChar, 2));  // Convert 8-bit chunks back to characters
    }).join('');
}

// XOR two binary strings
function xorBinary(bin1, bin2) {
    let xorResult = "";
    for (let i = 0; i < bin1.length; i++) {
        xorResult += bin1[i] ^ bin2[i % bin2.length];  // Repeating key if shorter
    }
    return xorResult;
}

// Encryption function
function encrypt() {
    let message = document.getElementById('message').value;
    let key = document.getElementById('key').value;

    if (message === "" || key === "") {
        alert("Please enter both message and key");
        return;
    }

    let binaryMessage = stringToBinary(message);  // Convert message to binary
    let binaryKey = stringToBinary(key);         // Convert key to binary
    let encryptedBinary = xorBinary(binaryMessage, binaryKey);  // XOR message with key

    document.getElementById('encryptedOutput').innerText = encryptedBinary;
}

// Decryption function
function decrypt() {
    let encryptedBinary = document.getElementById('encrypted').value;
    let key = document.getElementById('keyDecrypt').value;

    if (encryptedBinary === "" || key === "") {
        alert("Please enter both encrypted binary and key");
        return;
    }

    let binaryKey = stringToBinary(key);  // Convert key to binary
    let decryptedBinary = xorBinary(encryptedBinary, binaryKey);  // XOR encrypted text with key
    let decryptedMessage = binaryToString(decryptedBinary);  // Convert binary back to string

    document.getElementById('decryptedOutput').innerText = decryptedMessage;
}

// Copy to clipboard function
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Slider functionality
function setupSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return; // Exit if no slides (not on home page)

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Change slide every 3 seconds (reduced from 8)
}

// Run setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupSlider);
