const inputUsername = document.getElementById("input-field-username");
const inputPassword = document.getElementById("input-field-password");
const btnLogin = document.getElementById("btn-login");
const contentContainer = document.getElementById("content");
const verificationKey = "isVerifiedUser";

// Class: En klass som definierar användaren.
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

///////////////////////
// OBJEKTDEKLARATION //
///////////////////////

// Objekt: Hanterar användaruppgifter
const user1 = new User('test', '1234');
const user2 = new User('test2', '5678');

let userArray = [user1, user2];

// Objekt: Hanterar meddelanden menat för användaren
let alertMsg = {
    isActive: false,
    paraElement: document.createElement('p'),
    push: function(messageStr) {
        if(!this.isActive) {
            this.paraElement.textContent = messageStr;
            contentContainer.appendChild(this.paraElement);
            this.isActive = true;
        }
    },
    clear: function() {
        this.paraElement.remove();
        this.isActive = false;
    }
};

// Objekt: Hanterar välkomstmiljön för användaren
// Metod setActive() - Förväntar sig boolean-parametern 'activate'. (true/false) för (aktivera/inaktivera)
let welcomeScreen = {
    setActive: function(activate, user) {
        if(activate) {
            const welcomeContainer = document.createElement("div");
            const welcomeTitle = document.createElement("h1");
            const logoutBtn = document.createElement("button");
        
            welcomeContainer.classList.add("welcome-container");
            welcomeTitle.textContent = "Välkommen";
            logoutBtn.textContent = "Logga Ut";
        
            contentContainer.appendChild(welcomeContainer);
            welcomeContainer.appendChild(logoutBtn);
            welcomeContainer.appendChild(welcomeTitle);

            alertMsg.push("Du är nu inloggad som användaren " + user.username);
        
            // Logout-knappen: Aktiverar login-skärmen igen
            logoutBtn.addEventListener("click", function(){
                welcomeScreen.setActive(false, user);
                loginScreen.setActive(true);
            });
        }
        else {
            contentContainer.removeChild(contentContainer.querySelector(".welcome-container"));
            alertMsg.clear();
            localStorage.removeItem(verificationKey);
        }
    }
}

// Objekt: Hanterar välkomstmiljön för användaren
// Metod setActive() - Förväntar sig en boolean-parameter, (true/false) för (aktivera/inaktivera)
let loginScreen = {
    setActive: function(activate) {
        const loginContainer = document.getElementById("login-container");

        if(activate) {
            loginContainer.style.display = "block";
        }
        else {
            loginContainer.style.display = "none";
        }
    }
}

///////////////////////////////
// SLUT PÅ OBJEKTDEKLARATION //
///////////////////////////////

// Verifierar att användaren har matat in korrekt lösenord tidigare
if(getStoredObject(verificationKey)) {
    loginScreen.setActive(false);
    welcomeScreen.setActive(true, getStoredObject(verificationKey));
}

// Login-knappen: Kontrollerar att användaren har skrivit in korrent information i inputen.
//                Aktiverar välkomstskärmen för användaren.
btnLogin.addEventListener("click", function() {
    for(let i = 0; i < userArray.length; i++) {
        if(isValidInformation(userArray[i].username, userArray[i].password)) {
            storeObject(verificationKey, userArray[i]);
            inputUsername.value = '';
            inputPassword.value = '';
            alertMsg.clear();
            welcomeScreen.setActive(true, userArray[i]);
            loginScreen.setActive(false);
            return;
        }
    }

    inputPassword.value = '';
    alertMsg.push("Du har angett fel användarnamn eller lösenord");
});

// Returnerar ett boolean-värde om hurvida inloggningsuppgifterna stämmer
function isValidInformation(username, password) {
    if(inputUsername.value === username && inputPassword.value === password) {
        return true;
    }
    else {
        return false;
    }
}

// JSON: Omvandlar User-objektet till string
function storeObject(key, object) {
    serializedObj = JSON.stringify(object);
    localStorage.setItem(key, serializedObj);
}

// JSON: Omvandlar string till ett objekt
function getStoredObject(key) {
    // Ifall JSON inte kan omvanla korrekt
    // så returneras NULL. Användaren
    // loggas då inte in automatiskt efter
    // verifiering.
    try {
        deserializedObj = JSON.parse(localStorage.getItem(key));
    } 
    catch(error) {
        console.log(error);
        return null;
    }

    return deserializedObj;
}