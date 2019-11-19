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

    getBall(tileIndex) {
        if (tileIndex >= 0 || tileIndex < this.board.length) {
            return this.board[tileIndex];
        }
        return undefined;
    }

    moveBall(fromTile, toTile) {
        this.board[toTile] = this.board[fromTile];
        this.board[fromTile] = 0;
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
        for ( ; i < numberOfTiles; i++ ) {
            if (!this.board[i]) {
                if (randomTileIndex <= 0) {
                    this.board[i] = randomColorIndex;
                    return i;
                }
                randomTileIndex--;
            }
        }
    }

    dumpBoard(board) {
        var i = 0;
        for (var y = 0; y < this.sizeY; y++) {
            var line = " ";
            for (var x = 0; x < this.sizeX; x++, i++) {
                line += ("" + board[i]).padStart(4, " ");
                line += " ";
            }
            console.debug(y + ": [" + line + "]");
        }
    }

    findPath(fromTile, toTile) {
        var numberOfTiles = this.getBoardSize();
        if (fromTile == toTile) {
            return [fromTile];
        }

        var maskMap = [];
        for (var i = 0 ; i < numberOfTiles; i++ ) {
            if (!this.board[i]) {
                maskMap.push(0)
            } else {
                maskMap.push(-1);
            }
        }

        maskMap[fromTile] = 1;
        var lastStep = 0;
        for (var step = 1 ; step < numberOfTiles; step++ ) {
            for (var i = 0 ; i < numberOfTiles; i++ ) {
                // current step found
                if (maskMap[i] == step) {
                    this.nextTiles(i).forEach(ni => {
                        if (!maskMap[ni]) {
                            maskMap[ni] = step + 1;
                        }
                        if (ni === toTile) {
                            lastStep = step;
                        }
                    });
                }
                if (lastStep) break;
            }
            if (lastStep) break;
        }

        this.dumpBoard(maskMap);

        if (!lastStep) {
            return;
        }

        var tailTile = toTile;
        var path = [toTile];

        for (; lastStep > 1; lastStep--) {
            this.nextTiles(tailTile).forEach(ni => {
                if (maskMap[ni] === lastStep) {
                    tailTile = ni;
                }
            });
            path.unshift(tailTile);
        }
        path.unshift(fromTile);

        return path;
    }

    nextTiles(tileIndex) {
        var nextTiles = [];
        if (tileIndex < 0 || tileIndex >= this.board.length) {
            return nextTiles;
        }
        var tileX = tileIndex % this.sizeX;
        var tileY = Math.floor(tileIndex / this.sizeX);
        if (tileX > 0) {
            nextTiles.push(tileIndex - 1);
        }
        if (tileY > 0) {
            nextTiles.push(tileIndex - this.sizeX);
        }
        if (tileX < this.sizeX - 1) {
            nextTiles.push(tileIndex + 1);
        }
        if (tileY < this.sizeY - 1) {
            nextTiles.push(tileIndex + this.sizeX);
        }
        return nextTiles;
    }

}
