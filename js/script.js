let inputUsername;
let inputPassword;
let btnLogin;
const contentContainer = document.getElementById("content");
const verificationKey = "isVerifiedUser";
const userUrl = "./json/users.json";


// Objekt: Hanterar meddelanden menat för användaren
const alertMsg = {
    isActive: false,
    paraElement: document.createElement('p'),
    push: function (messageStr) {
        if (!this.isActive) {
            this.paraElement.textContent = messageStr;
            contentContainer.appendChild(this.paraElement);
            this.isActive = true;
        }
    },
    clear: function () {
        this.paraElement.remove();
        this.isActive = false;
    }
};

createLoginPage = () => {
    const loginContainer = customCreateElement("div", ["login-container"], contentContainer);

    inputUsername = customCreateElement("input", ["input-field-username"], loginContainer);
    inputUsername.type = "text";
    inputUsername.placeholder = "Användarnamn";

    inputPassword = customCreateElement("input", ["input-field-password"], loginContainer);
    inputPassword.type = "text";
    inputPassword.placeholder = "Lösenord";

    btnLogin = customCreateElement("button", ["btn-login"], loginContainer);
    btnLogin.innerText = "Logga In";
}


// Objekt: Hanterar välkomstmiljön för användaren
// Metod setActive() - Förväntar sig en boolean-parameter, (true/false) för (aktivera/inaktivera)
loginScreen = {
    setActive: (activate) => {
        if (activate) {
            createLoginPage();
        }
        else {
            if (contentContainer.querySelector(".login-container")) {
                contentContainer.removeChild(contentContainer.querySelector(".login-container"));
            }
        }
    }
}

// Funktion: Skapar och rangordnar nya element.
customCreateElement = (tag, classNames, parent) => {
    const element = document.createElement(tag);
    classNames.forEach(className => {
        element.classList.add(className);
    });
    parent.appendChild(element);
    return element;
}

// Objekt: Hanterar välkomstmiljön för användaren
// Metod setActive() - Förväntar sig boolean-parametern 'activate'. (true/false) för (aktivera/inaktivera)
const welcomeScreen = {
    setActive: function (activate, username) {
        if (activate) {
            const welcomeContainer = customCreateElement("div", ["welcome-container"], contentContainer);
            const welcomeTitle = customCreateElement("h1", [], welcomeContainer);
            const logoutBtn = customCreateElement("button", [], welcomeContainer);

            welcomeTitle.textContent = "Välkommen";
            logoutBtn.textContent = "Logga Ut";

            alertMsg.push("Du är nu inloggad som användaren " + username);

            // Logout-knappen: Aktiverar login-skärmen igen
            logoutBtn.addEventListener("click", function () {
                welcomeScreen.setActive(false, username);
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

// JSON: Omvandlar User-objektet till string
function storeObject(key, object) {
    serializedObj = JSON.stringify(object);
    localStorage.setItem(key, serializedObj);
}

// JSON: Omvandlar string till ett objekt
function getStoredObject(key) {
    // Ifall JSON inte kan omvandla korrekt
    // så returneras NULL. Användaren
    // loggas då inte in automatiskt efter
    // verifiering.
    try {
        deserializedObj = JSON.parse(localStorage.getItem(key));
    }
    catch (error) {
        console.log(error);
        return null;
    }

    return deserializedObj;
}

// Returnerar ett -1 ifall inloggningsuppgifterna inte stämmer
function validateInformation(users) {
    for (let i = 0; i < users.length; i++) {
        if (inputUsername.value === users[i].username && inputPassword.value === users[i].password) {
            return i;
        }
    }
    return -1;
}

isValidUser = (users) => {
    for (const user of users) {
        if (user.username === getStoredObject(verificationKey)) {
            return true;
        }
    }
    return false;
}

fetch(userUrl)
    .then(response => {
        return response.json();
    })
    .then(users => {
        if (isValidUser(users)) {
            console.log(getStoredObject(verificationKey));
            welcomeScreen.setActive(true, getStoredObject(verificationKey));
        }
        else {
            loginScreen.setActive(true);
        }
        // Login-knappen: Kontrollerar att användaren har skrivit in korrent information i inputen.
        //                Aktiverar välkomstskärmen för användaren.
        btnLogin.onclick = () => {
            const userIndex = validateInformation(users);
            console.log(validateInformation(users));

            if (userIndex === -1) {
                inputPassword.value = '';
                alertMsg.push("Du har angett fel användarnamn eller lösenord");
            }
            else {
                console.log(users[userIndex].username);
                storeObject(verificationKey, users[userIndex].username);
                inputUsername.value = '';
                inputPassword.value = '';
                alertMsg.clear();
                welcomeScreen.setActive(true, users[userIndex].username);
                loginScreen.setActive(false);
            }
        }
    });
