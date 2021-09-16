const inputUsername = document.getElementById("input-field-username");
const inputPassword = document.getElementById("input-field-password");
const loginContainer = document.getElementById("login-container");
const btnLogin = document.getElementById("btn-login");
const divContent = document.getElementById("content");
const username = "test";
const password = "1234";
let isAlert = false;

// Verifierar att användaren har matat in korrekt lösenord tidigare
if(localStorage.getItem("isVerified")){
    LoginScreenIsHidden(true);
    ApplyWelcomeScreen();
}

// Login-knappen: Kontrollerar att användaren har skrivit in korrent information i inputen.
//                Aktiverar välkomstskärmen för användaren.
btnLogin.addEventListener("click", function() {
    if(InformationIsValid(username, password)) {
        SaveLoginState();
        LoginScreenIsHidden(true);
        ApplyWelcomeScreen();
    }
    else {
        PushAlertMessage("Du har angett fel användarnamn eller lösenord");
    }
});

// Returnerar ett boolean-värde om hurvida inloggningsuppgifterna stämmer
function InformationIsValid(_username, _password) {
    if(inputUsername.value === _username && inputPassword.value === _password)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Ger ett felmeddelande ifall inkorrekta uppgifter har angivits
function PushAlertMessage(messageStr) {
    if(!isAlert){
        let alertParagraph = document.createElement("p");
        alertParagraph.classList.add("alert-msg");
        alertParagraph.textContent = messageStr;
        loginContainer.appendChild(alertParagraph);
        isAlert = true;
    }
}

// Skapar en välkomstsida för användaren vi inloggning
function ApplyWelcomeScreen() {
    const welcomeContainer = document.createElement("div");
    const welcomeTitle = document.createElement("h1");
    const logoutBtn = document.createElement("button");

    welcomeContainer.classList.add("welcome-container");
    welcomeTitle.textContent = "Välkommen";
    logoutBtn.textContent = "Logga Ut";

    divContent.appendChild(welcomeContainer);
    welcomeContainer.appendChild(logoutBtn);
    welcomeContainer.appendChild(welcomeTitle);

    inputUsername.value = "";
    inputPassword.value = "";

    // Logout-knappen: Aktiverar login-skärmen igen
    logoutBtn.addEventListener("click", function(){
        localStorage.removeItem("isVerified");
        LoginScreenIsHidden(false);
        RemoveWelcomeScreen();
    });
}

// Döljer/visar inloggningssidan
function LoginScreenIsHidden(isHidden) {
    if(isHidden) {
        loginContainer.style.display = "none";
    }
    else{
        loginContainer.style.display = "block";
    }
}

//  Användaren sparas som verifierad
function SaveLoginState() {
    localStorage.setItem("isVerified", username);
}

// Tar bort inloggningssidan
function RemoveWelcomeScreen() {
    divContent.removeChild(divContent.querySelector(".welcome-container"));

    if(isAlert) {
        divContent.removeChild(divContent.querySelector(".alert-msg"));
    }
}