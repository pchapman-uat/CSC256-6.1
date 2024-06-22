import {Player, Enemy} from "./Character.js";
document.addEventListener('DOMContentLoaded',main);

/**
 * @type {Player}
 */
var player;

const debug = true;
function main(){
    console.log('Hello World');
    const REGISTER_FORM = document.getElementById("accountForm")
    REGISTER_FORM.addEventListener("submit", register)
    if(debug == true){
        player = new Player("Username", "Display Name");
        player.score = 1000;
        startGame();
    }
}
function register(event){
    event.preventDefault();
    let username = document.getElementById("username").value;
    let displayName = document.getElementById("displayName").value;
    player = new Player(username, displayName);
    console.log(player);
    startGame();
}

function startGame(){
    console.log('Game Started');
    const PLAYER_STATS = {
        displayName: document.getElementById("game_DisplayName"),
        score: document.getElementById("game_Score"),
        health: document.getElementById("game_Health"),
    }

    PLAYER_STATS.displayName.innerHTML = player.name;
    PLAYER_STATS.score.innerHTML = "Score: "+player.score;
    PLAYER_STATS.health.innerHTML = "Health: "+player.health;

    let enemy = new Enemy("Enemy", 100);
    player.strongAttack(enemy);

}