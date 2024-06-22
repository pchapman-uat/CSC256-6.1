class Character {
    constructor(name, health){
        this.name = name;
        this.health = health;
    }

    takeDamage(damage){
        console.log(this.name + " took " + damage + " damage");
        this.health -= damage;
    }
}
class Player extends Character {
    constructor(username, name){
        super(name, 100);
        this.username = username;
        this.score = 0;
        this.baseAttack = 10;
    }
    strongAttack(enemy){
        enemy.takeDamage(this.baseAttack * 2);
    }
}

class Enemy extends Character {
    constructor(name, health){
        super(name, health);
    }
}
export {Player, Enemy};