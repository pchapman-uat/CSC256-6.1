class Character {
    recentLog = null;
    constructor(name, health, baseAttack=10){
        this.name = name;
        this.health = health;
        this.baseAttack = baseAttack;
    }

    takeDamage(damage){
        this.recentLog = " took " + damage + " damage"
        console.log(this.recentLog);
        this.health -= damage;
    }

    attackCharacter(character, damage){
        this.recentLog = " attacked " + character.name + " for " + damage + " damage"
        console.log(this.recentLog);
        character.takeDamage(damage);
    }

    logging(){
        return `${this.name} ${this.recentLog}`
    }
}
class Player extends Character {
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
}

class Enemy extends Character {
    constructor(name, health, points=health){
        super(name, health);
        this.points = points;
    }
    attackCharacter(character, damage=this.baseAttack){ 
        super.attackCharacter(character, damage+Math.floor(Math.random() * 10));
    }
}
export {Player, Enemy};