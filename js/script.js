const varificationKey = "varifiedUser";
const storedUser = localStorage.getItem(varificationKey);
const contentContainer = document.getElementById("content");

const customCreateElement = (tag, className, parent) => {
    const element = document.createElement(tag);
    element.classList.add(className);
    parent.appendChild(element);
    return element;
}

const saveToLocalStorage = (user) => {
    localStorage.setItem(varificationKey, user);
}

let alertMsg = {
    paraElement: null,
    push: function (messageStr) {
        if (!this.paraElement) {
            this.paraElement = customCreateElement("p", "alert-msg", contentContainer);
            this.paraElement.textContent = messageStr;
        }
    },
    clear: function () {
        if (this.paraElement) {
            this.paraElement.remove();
        }
    }
};

let loginScreen = {
    inputPassword: null,
    inputUsername: null,
    loginBtn: null,
    isActive: false,

    setActive:(setActive) => {
        if (setActive) {
            this.inputUsername = customCreateElement("input", "input-field-username", contentContainer);
            this.inputPassword = customCreateElement("input", "input-field-password", contentContainer);
            this.loginBtn = customCreateElement("button", "login-button", contentContainer);

            this.inputPassword.type = "password";
            this.inputPassword.placeholder = "Lösenord";
            this.inputUsername.type = "text";
            this.inputUsername.placeholder = "Användarnamn";
            this.loginBtn.textContent = "Logga In";

            this.loginBtn.addEventListener("click", async() => {
                username = await validateUser(this.inputUsername, this.inputPassword);
                if (username) {
                    welcomeScreen.setActive(true, username);
                    loginScreen.setActive(false, null);
                    localStorage.setItem(varificationKey, username);
                    alertMsg.clear();
                }
                else {
                    alertMsg.push("Du har angett fel användarnamn eller lösenord");
                }
            })
        }
        else {

            this.inputPassword.remove();
            this.inputUsername.remove();
            this.loginBtn.remove();
        }
    }
}

let welcomeScreen = {
    welcomeTitle: null,
    logoutBtn: null,
    isActive: false,
    setActive: (setActive, username) => {
        if (setActive) {
            this.welcomeTitle = customCreateElement("h1", "welcome-title", contentContainer);
            this.logoutBtn = customCreateElement("button", "login-button", contentContainer);
            this.welcomeTitle.textContent = "Välkommen " + username;
            this.logoutBtn.textContent = "Logga Ut";
            this.isActive = true;
            console.log("ossk");


            this.logoutBtn.addEventListener("click", () => {
                localStorage.removeItem(varificationKey);
                welcomeScreen.setActive(false, null);
                loginScreen.setActive(true);
            });
        }
        else {
            this.welcomeTitle.remove();
            this.logoutBtn.remove();

            this.isActive = false;
        }
    }
}

loadUsers = async () => {
    const response = await fetch("./json/users.json");
    const data = response.json();
    return data
}

if (storedUser) {
    welcomeScreen.setActive(true, storedUser);
}
else {
    loginScreen.setActive(true);
}

validateUser = async (usernameInput, passwordInput) => {
    const users = await loadUsers();
    for (let user of users) {
        if (user.username === usernameInput.value && user.password === passwordInput.value) {
            return user.username;
        }
    }
    return null;
}
