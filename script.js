const inputUsername = document.getElementById("input-field-username");
const inputPassword = document.getElementById("input-field-password");
const divConatiner = document.getElementById("container");
const btnLogin = document.getElementById("btn-login");
let alertParagraph = document.createElement("p");

btnLogin.addEventListener("click", function(){
    pushAlert("Du har angett fel användarnamn eller lösenord");
});

function pushAlert(messageStr) {
    // TODO: Om tid finns så bör styling läggas till på felmeddelandet

    alertParagraph.textContent = messageStr;
    divConatiner.appendChild(alertParagraph);
}