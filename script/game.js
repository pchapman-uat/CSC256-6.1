// Imports
// This file was clasified as a module in HTML to allow for imports from other files
import {Player, Enemy} from "./Character.js";
// On load start the main function
document.addEventListener('DOMContentLoaded',main);


// GLOBAL VARIABLES
// JSDoc is used for intelisense
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
 * @property {HTMLElement} item - The player's item element
 */

/**
 * @typedef {Object} Actions
 * @property {HTMLElement} div - The main game actions element.
 * @property {Object} attack - The attack actions.
 * @property {HTMLElement} attack.weak - The weak attack button element.
 * @property {HTMLElement} attack.normal - The normal attack button element.
 * @property {HTMLElement} attack.strong - The strong attack button element.
 * @property {Object} heal - The heal actions.
 * @property {HTMLElement} heal.weak - The weak heal button element.
 * @property {HTMLElement} heal.normal - The normal heal button element.
 * @property {HTMLElement} heal.strong - The strong heal button element.
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

// If this is true it will bypass the registry
const debug = true;
// Main function
function main(){
    console.log('Hello World');
    // Set the register form
    const REGISTER_FORM = document.getElementById("accountForm")
    // Add event listener for submiting account
    REGISTER_FORM.addEventListener("submit", register)
    // If dubug is true create default character
    if(debug == true){
        // Set the player
        player = new Player("Username", "Display Name");
        // Set the score
        player.score = 1000;
        // Set the game
        startGame();
    }
}
// Register the player
function register(event){
    // Prevent page from reloading
    event.preventDefault();
    // Save the username and display name
    let username = document.getElementById("username").value;
    let displayName = document.getElementById("displayName").value;
    // Create a player based on that information
    player = new Player(username, displayName);
    console.log(player);
    // Start the game
    startGame();
}

function startGame(){
    console.log('Game Started');
    // Update the palyer stats varriable
    PLAYER_STATS = {
        div: document.getElementById("gameScreen"),
        displayName: document.getElementById("game_DisplayName"),
        score: document.getElementById("game_Score"),
        health: document.getElementById("game_Health"),
        item: document.getElementById("game_Item"),
    };

    // Update the log varriable
    LOG = document.getElementById("game_Log");

    // Update the actions varriable
    ACTIONS = {
        div: document.getElementById("gameActions"),
        attack: {
            weak: document.getElementById("weakAttack"),
            normal: document.getElementById("normalAttack"),
            strong: document.getElementById("strongAttack"),
        },
        heal: {
            weak: document.getElementById("weakHeal"),
            normal: document.getElementById("normalHeal"),
            strong: document.getElementById("strongHeal"),
        },
    };

    // Update the enemy stats variable
    ENEMY_STATS = {
        displayName: document.getElementById("enemy_DisplayName"),
        points: document.getElementById("enemy_Points"),
        health: document.getElementById("enemy_Health"),
    };

    // Update the clear button and add event listener
    CLEAR_BTN = document.getElementById("clearLog");
    CLEAR_BTN.addEventListener("click", clearLog);

    // Show the actions and player stats
    ACTIONS.div.style.display = "block";
    PLAYER_STATS.div.style.display = "block";
    // Create a new enemy
    // TODO: Change to null to allow random name
    currentEnemy = new Enemy("Enemy", 100);
    // Update the current stats
    updateStats();

    // Add event listeners for all buttons
    ACTIONS.attack.weak.addEventListener("click", () => attack("weak"));
    ACTIONS.attack.normal.addEventListener("click", () => attack("normal"));
    ACTIONS.attack.strong.addEventListener("click", () => attack("strong"));

    ACTIONS.heal.weak.addEventListener("click", () => heal("weak"));
    ACTIONS.heal.normal.addEventListener("click", () => heal("normal"));
    ACTIONS.heal.strong.addEventListener("click", () => heal("strong"));

}
// Update the stats screen
function updateStats(){
    PLAYER_STATS.displayName.innerHTML = player.name;
    PLAYER_STATS.score.innerHTML = "Score: "+player.score;
    PLAYER_STATS.health.innerHTML = "Health: "+player.health;
    // Handle if player does not have a weapon
    if(player.item == null) PLAYER_STATS.item.innerHTML = "Item: None";
    else PLAYER_STATS.item.innerHTML = "Item: "+player.item.name+ ` (${player.item.damage})`;

    ENEMY_STATS.displayName.innerHTML = currentEnemy.name;
    ENEMY_STATS.health.innerHTML = "Health: "+currentEnemy.health;
    ENEMY_STATS.points.innerHTML = "Points: "+currentEnemy.points;
}
// Handle Attack types
function attack(type){
    // A switch cased is used rather than multiple if statements
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
    // Update the log
    LOG.innerHTML = player.logging()+"<br>"+LOG.innerHTML;
    // Attack the player
    currentEnemy.attackCharacter(player);
    // Update the log
    LOG.innerHTML = currentEnemy.logging()+"<br>"+LOG.innerHTML;
    // Update the stats
    updateStats();
    // If player lost
    if(player.health <= 0){
        console.log("Game Over");
        ACTIONS.div.style.display = "none";
        PLAYER_STATS.div.style.display = "none";
        document.getElementById("gameOver").style.display = "flex";
        document.getElementById("gameOver_Score").innerHTML = "Score: "+player.score;
        return;
    }
}
// Handle heal types
function heal(type){
    switch(type){
        case "weak":
            player.weakHeal();
            break;
        case "normal":
            player.normalHeal();
            break;
        case "strong":
            player.strongHeal();
            break;
        default:
            break;
    }
    // Update the log
    LOG.innerHTML = player.logging()+"<br>"+LOG.innerHTML;
    // Update the stats
    updateStats();
    // Attack the player
    currentEnemy.attackCharacter(player);
    // Update the log
    LOG.innerHTML = currentEnemy.logging()+"<br>"+LOG.innerHTML;
}
// Clear the log
function clearLog(){
    LOG.innerHTML = "";
}