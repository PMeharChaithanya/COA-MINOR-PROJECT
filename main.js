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
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    if (slides.length === 0) return; // Exit if no slides (not on home page)

    let currentSlide = 0;
    let intervalId;

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

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    // Event listeners for buttons
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }

    showSlide(currentSlide);
    startAutoSlide();
}

// Run setup when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupSlider);

function typeText(element, text, direction = 'right', delay = 50) {
    let i = 0;
    element.innerHTML = '';
    return new Promise((resolve) => {
        function type() {
            if (i < text.length) {
                if (direction === 'right') {
                    element.innerHTML += text.charAt(i);
                } else {
                    element.innerHTML = text.charAt(i) + element.innerHTML;
                }
                i++;
                setTimeout(type, delay);
            } else {
                setTimeout(resolve, 1000);
            }
        }
        type();
    });
}

function eraseText(element, direction = 'right', delay = 50) {
    return new Promise((resolve) => {
        function erase() {
            if (element.innerHTML.length > 0) {
                if (direction === 'right') {
                    element.innerHTML = element.innerHTML.slice(0, -1);
                } else {
                    element.innerHTML = element.innerHTML.slice(1);
                }
                setTimeout(erase, delay);
            } else {
                setTimeout(resolve, 500);
            }
        }
        erase();
    });
}

function animateText(element, text, delay = 50) {
    element.innerHTML = '';
    element.style.whiteSpace = 'normal'; // Allow text to wrap
    return new Promise((resolve) => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, delay);
            } else {
                setTimeout(resolve, 1000);
            }
        }
        type();
    });
}

async function animateTextSequence() {
    const projectName = document.getElementById('projectName');
    const projectSlogan = document.getElementById('projectSlogan');
    
    while (true) {
        projectName.style.opacity = '0';
        projectSlogan.style.opacity = '0';
        projectName.style.transform = 'translateY(20px)';
        projectSlogan.style.transform = 'translateY(20px)';
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        projectName.style.opacity = '1';
        projectName.style.transform = 'translateY(0)';
        await animateText(projectName, 'XOR Encryption');
        
        projectSlogan.style.opacity = '1';
        projectSlogan.style.transform = 'translateY(0)';
        await animateText(projectSlogan, 'Simplifying encryption, one bit at a time');
        
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

document.addEventListener('DOMContentLoaded', animateTextSequence);
