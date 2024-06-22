class Character {
    constructor(name, health){
        this.name = name;
        this.health = health;
    }
}
class Player extends Character {
    constructor(username, name){
        super(name, 100);
        this.username = username;
        this.score = 0;
    }
}

export default Player;