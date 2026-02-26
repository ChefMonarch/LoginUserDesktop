const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];

// Create snow
for(let i=0;i<150;i++){
    snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5
    });
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "white";

    snowflakes.forEach(flake => {
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI*2);
        ctx.fill();

        flake.y += flake.speed;

        // reset when off screen
        if(flake.y > canvas.height){
            flake.y = -5;
            flake.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(draw);
}

draw();

// Resize fix
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

///
// Login System
//

// Save new account locally
function SignUp(){

    // Get input values
    const username = document.getElementById("UN");
    const password = document.getElementById("PW");
    const msg = document.getElementById("LoginMsg");

    // Reset message
    if(username.value === "" || password.value === ""){
        msg.textContent = "Enter username & password to sign up";
        return;
    }

    // Store credentials
    localStorage.setItem("savedUser", username.value);
    localStorage.setItem("savedPass", password.value);

    // Success message
    msg.style.color = "lightgreen";
    msg.textContent = "Account saved locally! You can login now.";

    username.value = "";
    password.value = "";
}


// Login check
function NextPage(){

    // Get input values
    const username = document.getElementById("UN");
    const password = document.getElementById("PW");
    const msg = document.getElementById("LoginMsg");

    // Reset message
    msg.style.color = "red";
    msg.textContent = "";

    // Retrieve stored account
    const savedUser = localStorage.getItem("savedUser");
    const savedPass = localStorage.getItem("savedPass");

    // 🔹 SAVE ORIGIN PAGE (VERY IMPORTANT)
    // This remembers that login page is the origin
    sessionStorage.setItem("originPage", window.location.href);

    // Fixed Accounts
    // Public Desk
    if(username.value === "Mr_Admin" && password.value === "GodPlayer123"){
        window.location.href = "Desks/PublicDesk/Public.html";
    } 
    // KRV Desk
    else if(username.value === "TarnishedMonarch" && password.value === "7EldenRing$"){
        window.location.href = "Desks/Exclusive/KRVDesk/KRV.html";
    }
    // YS Desk
    else if(username.value === "HDSV" && password.value === "Gu"){
        window.location.href = "Desks/Exclusive/YSDesk/YS.html";
    }
    // JG Desk
    else if(username.value === "TheBunFactory" && password.value === "Recoil"){
        window.location.href = "Desks/Exclusive/JGDesk/JG.html";
    }

    // Locally Signed-Up Account
    else if(username.value === savedUser && password.value === savedPass){
        window.location.href = "Desks/PublicDesk/Public.html";
    }

    // Invalid Login
    else {
        msg.textContent = "Invalid Username or Password";
    }
}