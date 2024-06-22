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
}

class Enemy extends Character {
    constructor(name, health){
        super(name, health);
    }
}
export {Player, Enemy};