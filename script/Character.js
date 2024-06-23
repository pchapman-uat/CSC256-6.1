// Base Character Class
class Character {
    // TODO: Add JSDoc
    // Store the recent logging message
    recentLog = null;
    // Constructor for character
    // A default value is used for the attack
    constructor(name, health, baseAttack=10){
        this.name = name;
        this.health = health;
        this.baseAttack = baseAttack;
    }

    // Handle taking damage
    takeDamage(damage){
        // Decrease health
        this.health -= damage;
        // Prevent health from being negative
        if(this.health <= 0) {
            this.health = 0;
            return;
        };
        // Update the recent logging message
        this.recentLog = this.name + " took " + damage + " damage"
        console.log(this.recentLog);
        
    }

    // Handle attacking a character
    attackCharacter(character, damage){
        // Prvevent attack if health is 0
        if(this.health <= 0) return;
        // Update the recent logging message
        this.recentLog = this.name + " attacked " + character.name + " for " + damage + " damage"
        console.log(this.recentLog);
        // Call taking damage function
        character.takeDamage(damage);
    }

    // Return logging message
    logging(){
        return `${this.recentLog}`
    }
}

// The class of the player extends the base character class
class Player extends Character {
    // TODO: Add JSDoc
    item;
    // Constructer for the player
    constructor(username, name){
        // Call the base constructor
        super(name, 100);
        // Set the username
        this.username = username;
        // Set the score to 0
        this.score = 0;
    }
    // Haddle Attacking Enemy, multuple functions are used that adjust the base attack ammount
    // TODO: Add JSDoc
    strongAttack(enemy){
        this.attackCharacter(enemy, this.baseAttack * 2);
    }
    weakAttack(enemy){
        this.attackCharacter(enemy, this.baseAttack * 0.5);
    }
    normalAttack(enemy){
        this.attackCharacter(enemy, this.baseAttack);
    }
    // General attacking function
    attackCharacter(character, damage){
        // Calculat the damage based on the item
        damage = this.calculateDamage(damage);
        // Call base attack function
        super.attackCharacter(character, damage);
        // Check if the character is an enemy
        if(!(character instanceof Enemy)) return;
        // If the character died
        if(character.health <= 0){
            // Update the score
            this.score += character.points;
            // Give a random item
            this.randomItem();
            // Update the logging message
            this.recentLog = this.name+ " defeated " + character.name + " and gained " + character.points + " points<br>"+this.name+" got " +this.item.name +"!"
            console.log(this.recentLog);
        }
    }
    // Calculate damage
    calculateDamage(damage){
        // If there is an item, increase damage
        if(this.item) damage += this.item.damage;
        return damage;
    }
    // Get a random item
    randomItem(){
        this.addItem(randomItems[Math.floor(Math.random() * randomItems.length)]);
    }
    // Add an item
    // Add JSDoc
    addItem(item){
        this.item = item;
    }

    // Handle healing types
    weakHeal(){
        this.heal(10);
    }
    normalHeal(){
        this.heal(25);
    }
    strongHeal(){
        this.heal(50)
    }

    // Base heal function
    heal(ammount){
        // Increase health
        this.health += ammount;
        // Cap health a 100
        if(this.health > 100) this.health = 100;
        // Update log
        this.recentLog = this.name + " healed for " + ammount + " health"
    }
}

// Enemy class extends the base character class
class Enemy extends Character {
    // Random names for enemy
    randomNames = [
        "Goblin",
        "Orc",
        "Skeleton",
        "Bandit",
        "Slime",
        "Troll",
        "Zombie",
        "Vampire Bat",
        "Dark Mage",
        "Lizardman"
    ]
    // A default is used to allow for a random name, the points is set to the health if none is provided
    constructor(name=this.getRandomName(), health, points=health){
        // Call the orginal constructor
        super(name, health);
        // Set the points
        this.points = points;
    }
    // Attack a character
    // TODO: Add JSDoc
    attackCharacter(character, damage=this.baseAttack){ 
        // Call the base method using a random ammount
        super.attackCharacter(character, damage+Math.floor(Math.random() * 10));
        // If the enemy died spawn a new one
        if(this.health <= 0){
            this.reset();
            this.recentLog = "A new " + this.name + " has appeared!"
        }
    }
    // Reset the enemy
    // Default values are provided to allow for a random name, health and points
    reset(health=100, points=health, name=this.getRandomName()){
        this.health = health;
        this.name = name;
        this.points = points;
    }
    // Get a random name from aviaiable names
    getRandomName(){
        return this.randomNames[Math.floor(Math.random() * this.randomNames.length)];
    }
}

// Base item class
class Item {

    constructor(name, damage){
        this.name = name;
        this.damage = damage;
    }
    
}
// Array of all items
const randomItems = [
    new Item("Sword", 10),
    new Item("Axe", 15),
    new Item("Spear", 20),
    new Item("Dagger", 5),
]
// Export Player and Enemy to be used outside of file
export {Player, Enemy};