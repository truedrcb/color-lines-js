function randomIndex(numberOfIndices) {
    return Math.floor(Math.random() * numberOfIndices);
}

class Game {
    constructor(sizeX, sizeY) {
        this.sizeX = sizeX || 9;
        this.sizeY = sizeY || sizeX || 9;
        this.selectedIndex = -1;
        this.numberOfColors = 7;

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

    getBoardSize() {
        return this.board.length;
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

    setBall(tileIndex, colorIndex) {
        this.board[tileIndex] = colorIndex;
    }

    randomBallOnFreeTile() {
        var numberOfTiles = this.getBoardSize();
        var numberOfFreeTiles = numberOfTiles - this.countBalls();

        if (numberOfFreeTiles <= 0) {
            console.log("Game over. Free tiles: " + numberOfFreeTiles);
            return;
        }

        var randomColorIndex = randomIndex(this.numberOfColors) + 1;
        var randomTileIndex = randomIndex(numberOfFreeTiles);

        var i = 0;
        for( ; i < numberOfTiles; i++ ) {
            if (!this.board[i]) {
                if (randomTileIndex <= 0) {
                    this.board[i] = randomColorIndex;
                    return i;
                }
                randomTileIndex--;
            }
        }
    }

}
