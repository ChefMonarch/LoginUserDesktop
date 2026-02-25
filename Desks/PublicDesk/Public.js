let currentCode = "";

// ===== Generate 8-character random code =====
function generateCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    currentCode = result;
    document.getElementById("LiveCode").textContent = result;
}

// ===== Elements =====
const fileVaultBtn = document.getElementById("FileVault");
const vaultModal = document.getElementById("VaultModal");
const vaultClose = document.getElementById("VaultClose");
const vaultSubmit = document.getElementById("VaultSubmit");
const vaultInput = document.getElementById("VaultInput");
const vaultMessage = document.getElementById("VaultMessage");
const vaultWindow = document.getElementById("VaultWindow");

// ===== Open FileVault Window =====
fileVaultBtn.addEventListener("click", () => {
    vaultModal.style.display = "flex";
    vaultInput.value = "";
    vaultMessage.textContent = "";
    vaultInput.focus();
});

// ===== Close Mini Window =====
vaultClose.addEventListener("click", () => {
    vaultModal.style.display = "none";
});

// ===== Unlock Logic (first 4 characters only) =====
vaultSubmit.addEventListener("click", () => {
    const entered = vaultInput.value;
    const requiredCode = currentCode.substring(0, 4);

    if (entered === requiredCode) {
        window.open("System/System.html", "_blank");
    } else {
        vaultMessage.textContent = "Incorrect";
    }
});

vaultInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") vaultSubmit.click();
});

// ===== Auto-generate Code =====
generateCode();
setInterval(generateCode, 5000);

// ===== Drag Functionality =====
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

vaultWindow.addEventListener("mousedown", (e) => {
    if (e.target === vaultClose) return; // Don't drag when clicking close
    isDragging = true;
    offsetX = e.clientX - vaultWindow.offsetLeft;
    offsetY = e.clientY - vaultWindow.offsetTop;
    vaultWindow.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        vaultWindow.style.left = (e.clientX - offsetX) + "px";
        vaultWindow.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    vaultWindow.style.cursor = "grab";
});