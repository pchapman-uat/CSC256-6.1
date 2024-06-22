class Character {
    constructor(name){
        this.name = name;
    }
}
class Player extends Character {
    constructor(username, name){
        super(name);
        this.username = username;
        this.score = 0;
    }
}

export default Player;