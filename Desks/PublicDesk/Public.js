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
    for (let i = 0; i < 80; i++) {
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




// 
// CALCULATOR MINI WINDOW
// 

const calcBtn = document.getElementById("Calculator");
const calcModal = document.getElementById("CalcModal");
const calcWindow = document.getElementById("CalcWindow");
const calcClose = document.getElementById("CalcClose");
const calcDisplay = document.getElementById("calcDisplay");

// Open calculator
if (calcBtn) {
    calcBtn.addEventListener("click", () => {
        calcModal.style.display = "block";
    });
}

// Close calculator
if (calcClose) {
    calcClose.addEventListener("click", () => {
        calcModal.style.display = "none";
    });
}

// Calculator functions
window.appendToDisplay = function(input) {
    calcDisplay.value += input;
};

window.clearDisplay = function() {
    calcDisplay.value = "";
};

window.calculate = function() {
    try {
        calcDisplay.value = eval(calcDisplay.value);
    } catch {
        calcDisplay.value = "Error";
    }
};

// Dragging
let calcDragging = false;
let calcOffsetX = 0;
let calcOffsetY = 0;

if (calcWindow) {
    calcWindow.addEventListener("mousedown", (e) => {
        if (e.target === calcClose) return;
        calcDragging = true;
        calcOffsetX = e.clientX - calcWindow.offsetLeft;
        calcOffsetY = e.clientY - calcWindow.offsetTop;
        calcWindow.style.cursor = "grabbing";
    });
}

document.addEventListener("mousemove", (e) => {
    if (calcDragging) {
        calcWindow.style.left = (e.clientX - calcOffsetX) + "px";
        calcWindow.style.top = (e.clientY - calcOffsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    calcDragging = false;
    if (calcWindow) calcWindow.style.cursor = "grab";
});


// Logout Button (redirects to main index page)
function returnToOrigin() {
    const origin = sessionStorage.getItem("originPage");

    if (origin) {
        window.location.href = origin;
    } else {
        // Fallback if session lost (refresh/direct access)
        window.location.href = "../../index.html";
    }
}




// 
// SIMPLE PLAYLIST ROTATOR (5+ TRACKS)
// 

// SIMPLE PLAYLIST ROTATOR (FIXED AUTOPLAY)

document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("bgMusic");
    const muteBtn = document.getElementById("MuteBtn");

    const playlist = [
        "Music/LaFaena-CarDrive.mp3",
        "Music/MaestroOne-AllSaidAndDone.mp3",
        "Music/MaestroOne-LetItGo.mp3",
        "Music/SandroMarinoni-EndUp.mp3",
        "Music/TillParadiso-NewIdeas.mp3"
    ];

    let currentTrack = 0;
    let hasStarted = false; // prevents multiple triggers

    function loadTrack(index) {
        audio.src = playlist[index];
        audio.load();
    }

    function startMusic() {
        if (hasStarted) return;

        hasStarted = true;
        loadTrack(currentTrack);

        audio.play().catch(err => {
            console.log("Playback blocked:", err);
        });
    }

    // 🔥 Start music on FIRST user interaction
    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("keydown", startMusic, { once: true });

    // When track ends → go to next
    audio.addEventListener("ended", () => {
        currentTrack++;
        if (currentTrack >= playlist.length) currentTrack = 0;
        loadTrack(currentTrack);
        audio.play();
    });

    // Mute toggle
    muteBtn.addEventListener("click", () => {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    });

});