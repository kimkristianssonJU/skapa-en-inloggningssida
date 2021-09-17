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

let userArray = [user1];

// Objekt: Hanterar meddelanden menat för användaren
let alertMsg = {
    paraElement: document.createElement('p'),

    push: function(messageStr) {
        this.paraElement.textContent = messageStr;
        contentContainer.appendChild(this.paraElement);
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

////////////////
// Nytt konto //
////////////////

/* 
Här nedanför följer kod som egentligen är överflödig för uppgifter.
Jag blev sugen att använda mig av objekten på det sätt som jag i 
åtanke hade när jag började skriva.
Dessvärre kom jag på dessa idéer alldeles för sent för att kunna
göra mer utförligt, med fler funktioner. Men tid fanns inte.
Jag inser att det fungerade som jag hade förväntat mig.
Koden är i detta fallet är experimentell. 
Den är inte vacker, men den fungerar :)

I stora drag: Här tillåts användaren att göra ett nytt konto.
Det nya kontot lagras i localStorage och användare kan
förvänta sig kunna komma tillbaka och logga in igen.
 
Vissa kriterier finns:
    * Användaren ska ha mer än 4 karaktärer i namn och lösen
    * Användaren ska använda ett namn som inte redan är taget
    * Användaren får inte använda mellanslag i verken lösen eller namn
    
Nu är klockan 23.35, fredag den 17:e och jag behöver pusha 
*/

let signInBtn = document.getElementById("sign-in");
let userArrayKey = "arrayOfUsers";

if(getStoredObject(userArrayKey)) {
    let addedUserArray = getStoredObject(userArrayKey);

    for(let i = 0; i < addedUserArray.length; i++) {
        if(addedUserArray[i].username !== "test")
        {
            userArray.push(addedUserArray[i]);
        }
    }
}

signInBtn.addEventListener("click", function() {
    loginScreen.setActive(false);
    createAccountScreen.setActive(true);
});

let createAccountScreen = {
    setActive: function(activate) {
        if(activate) {
            const createAccountContainer = document.createElement("div");
            const createAccountTitle = document.createElement("h1");
            const confirmBtn = document.createElement("button");
            const cancelBtn = document.createElement("button");
            const chooseUsernameInput = document.createElement("input");
            const choosePasswordInput = document.createElement("input");
            const confirmPasswordInput = document.createElement("input");
            
            confirmBtn.textContent = "Fortsätt";
            cancelBtn.textContent = "Avbryt";
            createAccountTitle.textContent = "Skapa Konto";

            chooseUsernameInput.placeholder = "Användarnamn";
            choosePasswordInput.placeholder = "Lösenord";
            confirmPasswordInput.placeholder = "Bekräfta Lösenord";

            choosePasswordInput.type = "password";
            confirmPasswordInput.type = "password";

            createAccountContainer.classList.add("create-account-container");
            

            contentContainer.appendChild(createAccountContainer);
            createAccountContainer.appendChild(createAccountTitle);
            createAccountContainer.appendChild(chooseUsernameInput);
            createAccountContainer.appendChild(choosePasswordInput);
            createAccountContainer.appendChild(confirmPasswordInput);
            createAccountContainer.appendChild(confirmBtn);
            createAccountContainer.appendChild(cancelBtn);

            chooseUsernameInput.style.display = "block";
            choosePasswordInput.style.display = "block";
            confirmPasswordInput.style.display = "block";

            console.log(userArray);
        
            confirmBtn.addEventListener("click", function(){
                if(isAcceptableInformation(chooseUsernameInput.value, choosePasswordInput.value, confirmPasswordInput.value)) {
                    newUser = new User(chooseUsernameInput.value, chooseUsernameInput.value);
                    console.log(newUser);
                    userArray.push(newUser);
                    storeObject(userArrayKey, userArray);
                    
                    chooseUsernameInput.value = "";
                    choosePasswordInput.value = "";
                    confirmPasswordInput.value = "";

                    createAccountScreen.setActive(false);
                    welcomeScreen.setActive(true, newUser);
                }
                else {
                    choosePasswordInput.value = "";
                    confirmPasswordInput.value = "";

                }
            });

            cancelBtn.addEventListener("click", function(){
                loginScreen.setActive(true);
                createAccountScreen.setActive(false);
            });
        }
        else {
            contentContainer.removeChild(contentContainer.querySelector(".create-account-container"));
            alertMsg.clear();
        }
    }
}

function isAcceptableInformation(usernameInput, passwordInput, confirmInput)
{
    isAccepted = true;
    if(usernameInput.length < 4 || passwordInput.length < 4) {
        alertMsg.push("Användarnamn och lösenord måste innehålla minst 4 karaktärer.");
        isAccepted = false;
    }
    if(usernameInput.indexOf(' ') > 0 || passwordInput.indexOf(' ') > 0) {
        alertMsg.push("Användarnamn och lösenord får inte inehålla mellanslag.");
        isAccepted = false;
    }
    if(confirmInput !== passwordInput) {
        alertMsg.push("Lösenorden måste matcha.");
        isAccepted = false;
    }
    for(let i = 0; i < userArray.length; i++) {
        if(userArray[i].username === usernameInput) {
            alertMsg.push("Detta användarnamn används redan");
            isAccepted = false;
        }
    }

    return isAccepted;
}