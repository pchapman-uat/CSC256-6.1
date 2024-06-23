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

/**
 * @typedef {Object} EnemyStats
 * @property {HTMLElement} displayName - The enemy's display name element.
 * @property {HTMLElement} points - The enemy's points element.
 * @property {HTMLElement} health - The enemy's health element.
 */

/**
 * @type {EnemyStats}
 */
var ENEMY_STATS;
/**
 * @type {HTMLElement}
 */
var CLEAR_BTN;
const debug = false;
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

    ENEMY_STATS = {
        displayName: document.getElementById("enemy_DisplayName"),
        points: document.getElementById("enemy_Points"),
        health: document.getElementById("enemy_Health"),
    };

    CLEAR_BTN = document.getElementById("clearLog");
    CLEAR_BTN.addEventListener("click", clearLog);

    ACTIONS.div.style.display = "block";
    PLAYER_STATS.div.style.display = "block";
    currentEnemy = new Enemy("Enemy", 100);
    updateStats();

    ACTIONS.attack.weak.addEventListener("click", () => attack("weak"));
    ACTIONS.attack.normal.addEventListener("click", () => attack("normal"));
    ACTIONS.attack.strong.addEventListener("click", () => attack("strong"));

}
function updateStats(){
    PLAYER_STATS.displayName.innerHTML = player.name;
    PLAYER_STATS.score.innerHTML = "Score: "+player.score;
    PLAYER_STATS.health.innerHTML = "Health: "+player.health;

    ENEMY_STATS.displayName.innerHTML = currentEnemy.name;
    ENEMY_STATS.health.innerHTML = "Health: "+currentEnemy.health;
    ENEMY_STATS.points.innerHTML = "Points: "+currentEnemy.points;
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
    LOG.innerHTML = player.logging()+"<br>"+LOG.innerHTML;
    currentEnemy.attackCharacter(player);
    LOG.innerHTML = currentEnemy.logging()+"<br>"+LOG.innerHTML;
    updateStats();
    if(player.health <= 0){
        console.log("Game Over");
        ACTIONS.div.style.display = "none";
        PLAYER_STATS.div.style.display = "none";
        document.getElementById("gameOver").style.display = "flex";
        document.getElementById("gameOver_Score").innerHTML = "Score: "+player.score;
        return;
    }
}

function clearLog(){
    LOG.innerHTML = "";
}