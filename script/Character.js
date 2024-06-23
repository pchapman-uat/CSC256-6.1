class Character {
    recentLog = null;
    constructor(name, health, baseAttack=10){
        this.name = name;
        this.health = health;
        this.baseAttack = baseAttack;
    }

    takeDamage(damage){
        this.health -= damage;
        if(this.health <= 0) {
            this.health = 0;
            return;
        };
        this.recentLog = this.name + " took " + damage + " damage"
        console.log(this.recentLog);
        
    }

    attackCharacter(character, damage){
        if(this.health <= 0) return;
        this.recentLog = this.name + " attacked " + character.name + " for " + damage + " damage"
        console.log(this.recentLog);
        character.takeDamage(damage);
    }

    logging(){
        return `${this.recentLog}`
    }
}
class Player extends Character {
    item;
    constructor(username, name){
        super(name, 100);
        this.username = username;
        this.score = 0;
    }
    strongAttack(enemy){
        this.attackCharacter(enemy, this.baseAttack * 2);
    }
    weakAttack(enemy){
        this.attackCharacter(enemy, this.baseAttack * 0.5);
    }
    normalAttack(enemy){
        this.attackCharacter(enemy, this.baseAttack);
    }
    attackCharacter(character, damage){
        this.calculateDamage(damage);
        super.attackCharacter(character, damage);
        if(!(character instanceof Enemy)) return;
        if(character.health <= 0){
            this.score += character.points;
            this.randomItem();
            this.recentLog = this.name+ " defeated " + character.name + " and gained " + character.points + " points<br>"+this.name+" got " +this.item.name +"!"
            console.log(this.recentLog);
        }
    }
    calculateDamage(damage){
        if(this.item) damage += this.item.damage;
        return damage;
    }
    randomItem(){
        this.addItem(randomItems[Math.floor(Math.random() * randomItems.length)]);
    }
    addItem(item){
        this.item = item;
    }

    weakHeal(){
        this.heal(10);
    }
    normalHeal(){
        this.heal(25);
    }
    strongHeal(){
        this.heal(50)
    }

    heal(ammount){
        this.health += ammount;
        if(this.health > 100) this.health = 100;
        this.recentLog = this.name + " healed for " + ammount + " health"
    }
}

class Enemy extends Character {
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
    constructor(name=this.getRandomName(), health, points=health){
        super(name, health);
        this.points = points;
    }
    attackCharacter(character, damage=this.baseAttack){ 
        super.attackCharacter(character, damage+Math.floor(Math.random() * 10));
        if(this.health <= 0){
            this.reset();
            this.recentLog = "A new " + this.name + " has appeared!"
        }
    }
    reset(health=100, points=health, name=this.getRandomName()){
        this.health = health;
        this.name = name;
        this.points = points;
    }
    getRandomName(){
        return this.randomNames[Math.floor(Math.random() * this.randomNames.length)];
    }
}

class Item {

    constructor(name, damage){
        this.name = name;
        this.damage = damage;
    }
    
}

const randomItems = [
    new Item("Sword", 10),
    new Item("Axe", 15),
    new Item("Spear", 20),
    new Item("Dagger", 5),
]
export {Player, Enemy};