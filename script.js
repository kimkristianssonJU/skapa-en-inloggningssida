const inputUsername = document.getElementById("input-field-username");
const inputPassword = document.getElementById("input-field-password");
const loginContainer = document.getElementById("login-container");
const btnLogin = document.getElementById("btn-login");
const divContent = document.getElementById("content");
const welcomeContainer = document.createElement("div");
const welcomeTitle = document.createElement("h1");
const logoutBtn = document.createElement("button");
let alertParagraph = document.createElement("p");
const username = "test";
const password = "1234";

// Verifierar att användaren har matat in korrekt lösenord tidigare
if(localStorage.getItem("isVerified")){
    LoginScreenIsHidden(true);
    applyWelcomeScreen();
}

// Login-knappen: Kontrollerar att användaren har skrivit in korrent information i inputen.
//                Aktiverar välkomstskärmen för användaren.
btnLogin.addEventListener("click", function() {
    if(InformationIsValid(username, password)) {
        SaveLoginState();
        LoginScreenIsHidden(true);
        applyWelcomeScreen();
    }
    else {
        PushAlertMessage("Du har angett fel användarnamn eller lösenord");
    }
});

// Logout-knappen: Aktiverar login-skärmen igen
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("isVerified");
    LoginScreenIsHidden(false);
    RemoveWelcomeScreen();
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
    alertParagraph.textContent = messageStr;
    loginContainer.appendChild(alertParagraph);
}

// Skapar en välkomstsida för användaren vi inloggning
function applyWelcomeScreen() {
    welcomeTitle.textContent = "Välkommen";
    logoutBtn.textContent = "Logga Ut";
    divContent.appendChild(welcomeContainer);
    welcomeContainer.appendChild(logoutBtn);
    welcomeContainer.appendChild(welcomeTitle);
    inputUsername.value = "";
    inputPassword.value = "";
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
    localStorage.setItem("isVerified", "true");
}

// Tar bort inloggningssidan
function RemoveWelcomeScreen() {
    welcomeContainer.remove();
    
    if(alertParagraph) {
        alertParagraph.remove();
    }
}