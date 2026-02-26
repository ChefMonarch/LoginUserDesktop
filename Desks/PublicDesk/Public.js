//
// This chunk of code is for the locked file/note app
//

document.addEventListener("DOMContentLoaded", () => {

let currentCode = "";

//  Generate random code with styled colors 
function generateCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let result = "";
    let coloredHTML = "";

    // Keeping visual style (long animated string)
    for (let i = 0; i < 100; i++) {
        const char = characters[Math.floor(Math.random() * characters.length)];
        result += char;

        // Random color logic (unchanged)
        const rand = Math.random();
        // green default
        let color = "#499c1a";

        if (rand < 0.15) color = "#ff4444";      
        else if (rand < 0.35) color = "#4690ff"; 

        coloredHTML += `<span style="color:${color}">${char}</span>`;
    }

    currentCode = result;

    const liveCodeEl = document.getElementById("LiveCode");
    if (liveCodeEl) {
        liveCodeEl.innerHTML = coloredHTML;
    }
}

//  Elements 
const fileVaultBtn = document.getElementById("NotesVault");
const vaultModal = document.getElementById("VaultModal");
const vaultClose = document.getElementById("VaultClose");
const vaultSubmit = document.getElementById("VaultSubmit");
const vaultInput = document.getElementById("VaultInput");
const vaultMessage = document.getElementById("VaultMessage");
const vaultWindow = document.getElementById("VaultWindow");

//  Open NotesVault Window
if (fileVaultBtn) {
    fileVaultBtn.addEventListener("click", () => {
        vaultModal.style.display = "flex";
        vaultInput.value = "";
        vaultMessage.textContent = "";
        vaultInput.focus();
    });
}

//  Close Mini Window 
if (vaultClose) {
    vaultClose.addEventListener("click", () => {
        vaultModal.style.display = "none";
    });
}

//  Unlock Logic (first 6 characters ONLY — matches UI text) 
if (vaultSubmit) {
    vaultSubmit.addEventListener("click", () => {
        const entered = vaultInput.value;
        const requiredCode = currentCode.substring(0, 6);

        if (entered === requiredCode) {
            window.open("Apps/FileApp/LockedFile/LockedIndex.html", "_blank");
            vaultModal.style.display = "none";
        } else {
            vaultMessage.textContent = "Incorrect";
        }
    });
}

if (vaultInput) {
    vaultInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") vaultSubmit.click();
    });
}

//  Auto-generate Code 
generateCode();
setInterval(generateCode, 10000);

//  Drag Functionality 
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

if (vaultWindow) {
    vaultWindow.addEventListener("mousedown", (e) => {
        if (e.target === vaultClose) return;
        isDragging = true;
        offsetX = e.clientX - vaultWindow.offsetLeft;
        offsetY = e.clientY - vaultWindow.offsetTop;
        vaultWindow.style.cursor = "grabbing";
    });
}

document.addEventListener("mousemove", (e) => {
    if (isDragging && vaultWindow) {
        vaultWindow.style.left = (e.clientX - offsetX) + "px";
        vaultWindow.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    if (vaultWindow) vaultWindow.style.cursor = "grab";
});

});