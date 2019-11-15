class Game {
    constructor() {
        this.sizeX = 9;
        this.sizeY = 9;
        this.selectedIndex = -1;

        this.board = [];
        for (var y = 0, i = 0; y < this.sizeY; y++) {
            for (var x = 0; x < this.sizeX; x++, i++) {
                this.board.push(0);
            }
        }
    }

    getBoard() {
        return this.board;
    }

    getSelectedIndex() {
        return this.selectedIndex;
    }

    selectBall(tileIndex) {
        this.selectedIndex = tileIndex;
    }

    countBalls() {
        var count = 0;
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i] > 0) count++;
        }
        return count;
    }


}
