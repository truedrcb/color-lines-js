class Game {
    constructor() {
        this.sizeX = 9;
        this.sizeY = 9;

        this.board = [];
        for (var y = 0, i = 0; y < this.sizeY; y++) {
            for (var x = 0; x < this.sizeX; x++, i++) {
                this.board.push(i);
            }
        }
    }

    getBoard() {
        return this.board;
    }
}
