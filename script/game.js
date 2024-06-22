import Player from "./Character.js";
document.addEventListener('DOMContentLoaded',main);

function main(){
    console.log('Hello World');
    const REGISTER_FORM = document.getElementById("accountForm")
    REGISTER_FORM.addEventListener("submit", register)
}
function register(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let displayName = document.getElementById("displayName").value;
    let player = new Player(username, displayName);
    console.log(player);
}