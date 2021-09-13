const inputUsername = document.getElementById("input-field-username");
const inputPassword = document.getElementById("input-field-password");
const divConatiner = document.getElementById("container");
const btnLogin = document.getElementById("btn-login");
let alertParagraph = document.createElement("p");

btnLogin.addEventListener("click", function(){
    if(informationIsValid())
    {
        console.log("true");
    }
});

function pushAlert(messageStr) {
    // TODO: Om tid finns så bör styling läggas till på felmeddelandet

    alertParagraph.textContent = messageStr;
    divConatiner.appendChild(alertParagraph);
}

function informationIsValid()
{
    if(inputUsername.value === "test" && inputPassword.value === "1234")
    {
        return true;
    }
    else
    {
        return false;
    }
}