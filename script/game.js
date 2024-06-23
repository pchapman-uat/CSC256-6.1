import {Player, Enemy} from "./Character.js";
document.addEventListener('DOMContentLoaded',main);


// GLOBAL VARIABLES
/**
 * @type {Player}
 */
var player;
/**
 * @type {Enemy}
 */
var currentEnemy;
/**
 * @typedef {Object} PlayerStats
 * @property {HTMLElement} div - The main game screen element.
 * @property {HTMLElement} displayName - The player's display name element.
 * @property {HTMLElement} score - The player's score element.
 * @property {HTMLElement} health - The player's health element.
 */

/**
 * @typedef {Object} Actions
 * @property {HTMLElement} div - The main game actions element.
 * @property {Object} attack - The attack actions.
 * @property {HTMLElement} attack.weak - The weak attack button element.
 * @property {HTMLElement} attack.normal - The normal attack button element.
 * @property {HTMLElement} attack.strong - The strong attack button element.
 */

/**
 * The player stats.
 * @type {PlayerStats}
 */
var PLAYER_STATS;

/**
 * The game log element.
 * @type {HTMLElement}
 */
var LOG;

/**
 * The game actions.
 * @type {Actions}
 */
var ACTIONS;


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
    PLAYER_STATS = {
        div: document.getElementById("gameScreen"),
        displayName: document.getElementById("game_DisplayName"),
        score: document.getElementById("game_Score"),
        health: document.getElementById("game_Health"),
    };

    LOG = document.getElementById("game_Log");

    ACTIONS = {
        div: document.getElementById("gameActions"),
        attack: {
            weak: document.getElementById("weakAttack"),
            normal: document.getElementById("normalAttack"),
            strong: document.getElementById("strongAttack"),
        },
    };

    ACTIONS.div.style.visibility = "visible";
    PLAYER_STATS.div.style.visibility = "visible";

    PLAYER_STATS.displayName.innerHTML = player.name;
    PLAYER_STATS.score.innerHTML = "Score: "+player.score;
    PLAYER_STATS.health.innerHTML = "Health: "+player.health;

    ACTIONS.attack.weak.addEventListener("click", () => attack("weak"));
    ACTIONS.attack.normal.addEventListener("click", () => attack("normal"));
    ACTIONS.attack.strong.addEventListener("click", () => attack("strong"));

    currentEnemy = new Enemy("Enemy", 100);
    player.strongAttack(currentEnemy);
    LOG.innerHTML += player.logging()+"<br>";

}

function attack(type){
    switch(type){
        case "weak":
            player.weakAttack(currentEnemy);
            break;
        case "normal":
            player.normalAttack(currentEnemy);
            break;
        case "strong":
            player.strongAttack(currentEnemy);
            break;
        default:
            break;
    }
    LOG.innerHTML += player.logging()+"<br>";
}