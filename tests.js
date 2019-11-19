QUnit.test("Game board initialization", function (assert) {
    var game = new Game();
    assert.strictEqual(game.getBoardSize(), 81, "Correct board size");
    game.getBoard().forEach(tile => {
        assert.strictEqual(tile, 0, "Tile is empty");
    });
    assert.ok(game.getSelectedIndex() < 0, "Nothing selected");
    assert.strictEqual(game.countBalls(), 0, "No balls in game");
});

QUnit.test("Count balls", function (assert) {
    var game = new Game();
    assert.strictEqual(game.countBalls(), 0, "No balls in game");
    game.setBall(0, 1);
    assert.strictEqual(game.countBalls(), 1, "1 ball in game");
    game.setBall(10, 1);
    assert.strictEqual(game.countBalls(), 2, "2 balls in game");

    game.setBall(0, 2);
    assert.strictEqual(game.countBalls(), 2, "still 2 balls in game. Ball was set instead of existing one");

    game.setBall(10, 0);
    assert.strictEqual(game.countBalls(), 1, "1 ball in game. Ball was removed by setting color to 0");
});

QUnit.test("2x2 Game board initialization", function (assert) {
    var game = new Game(2, 2);
    assert.strictEqual(game.getBoardSize(), 4, "Correct board size");
});

QUnit.test("3x3 Game board initialization", function (assert) {
    var game = new Game(3);
    assert.strictEqual(game.getBoardSize(), 9, "Correct board size");
});

QUnit.test("5x10 Game board initialization", function (assert) {
    var game = new Game(5, 10);
    assert.strictEqual(game.getBoardSize(), 50, "Correct board size");
    game.getBoard().forEach(tile => {
        assert.strictEqual(tile, 0, "Tile is empty");
    });
    assert.ok(game.getSelectedIndex() < 0, "Nothing selected");
    assert.strictEqual(game.countBalls(), 0, "No balls in game");
});

QUnit.test("3x3 Game fill with random balls", function (assert) {
    var game = new Game(3);
    for (var i = 0 ; i < 9 ; i ++) {
        assert.strictEqual(game.countBalls(), i, i + " balls in game");
        var newBallIndex = game.randomBallOnFreeTile();
        assert.ok(game.getBoard()[newBallIndex] > 0, "Ball is set at index: " + newBallIndex);
    }
    assert.strictEqual(game.countBalls(), 9, "Game should be over");
});

QUnit.test("Random index returns integers", function (assert) {
    for (var i = 1; i < 10; i++) {
        var r = randomIndex(i);
        assert.ok(r >= 0, "Random number is greater or equal zero: " + r);
        assert.ok(r < i, "Random number is less than max index (" + i + "): " + r);
        assert.ok(Number.isInteger(r), "Random number is integer: " + r);
    }
});

QUnit.test("Simple move ball", function (assert) {
    var game = new Game(5);

    game.setBall(10, 3);
    assert.strictEqual(game.countBalls(), 1, "1 ball in game");
    assert.strictEqual(game.getBoard()[10], 3, "ball on position 10");

    game.moveBall(10, 15);
    assert.strictEqual(game.countBalls(), 1, "1 ball in game");
    assert.strictEqual(game.getBoard()[10], 0, "no ball on position 10");
    assert.strictEqual(game.getBoard()[15], 3, "ball on position 15");
});


QUnit.test("Get ball", function (assert) {
    var game = new Game(5);

    game.setBall(10, 3);
    assert.strictEqual(game.countBalls(), 1, "1 ball in game");
    assert.strictEqual(game.getBall(10), 3, "ball on position 10");

    assert.notOk(game.getBall(11), "no ball on position 11");
    assert.notOk(game.getBall(-11), "no ball on position -11");
    assert.notOk(game.getBall(25), "no ball on position 25");
});


function assertNextTiles(assert, actualTiles, expectedTiles) {
    assert.deepEqual(actualTiles.sort(function(a, b){return a - b}), expectedTiles.sort(function(a, b){return a - b}));
}

QUnit.test("Find next tiles", function (assert) {
    var game = new Game(5);

    assert.strictEqual(game.nextTiles(-1).length, 0);
    assert.strictEqual(game.nextTiles(0).length, 2);
    assertNextTiles(assert, game.nextTiles(0), [1, 5]);
    assert.strictEqual(game.nextTiles(1).length, 3);
    assertNextTiles(assert, game.nextTiles(1), [0, 2, 6]);
    assert.strictEqual(game.nextTiles(4).length, 2);
    assertNextTiles(assert, game.nextTiles(4), [3, 9]);
    assert.strictEqual(game.nextTiles(5).length, 3);
    assertNextTiles(assert, game.nextTiles(5), [0, 6, 10]);
    assert.strictEqual(game.nextTiles(6).length, 4);
    assertNextTiles(assert, game.nextTiles(6), [1, 5, 7, 11]);
});

QUnit.test("Find simple horizontal path", function (assert) {
    var game = new Game(5);

    assert.deepEqual(game.findPath(0, 4), [0, 1, 2, 3, 4]);

    assert.deepEqual(game.findPath(4, 0), [4, 3, 2, 1, 0]);

    assert.deepEqual(game.findPath(0, 1), [0, 1]);
});

QUnit.test("Find simple vertical path", function (assert) {
    var game = new Game(5);
    
    assert.deepEqual(game.findPath(0, 20), [0, 5, 10, 15, 20]);

    assert.deepEqual(game.findPath(15, 20), [15, 20]);
});

QUnit.test("Find simple diagonal path", function (assert) {
    var game = new Game(5);
    
    var path = game.findPath(4, 20);
    assert.strictEqual(path.length, 9);
    assert.strictEqual(path[0], 4);
    assert.strictEqual(path[8], 20);
});


QUnit.test("No path", function (assert) {
    var game = new Game(5);
    game.setBall(1, 6);
    game.setBall(5, 6);

    assert.notOk(game.findPath(0, 4));
    assert.notOk(game.findPath(4, 0));
});

QUnit.test("Long path", function (assert) {
    var game = new Game(5);
    game.board = 
        [ 
            0, 5, 0, 0, 0,
            0, 5, 0, 5, 0,
            0, 5, 0, 5, 0,
            0, 5, 0, 5, 0,
            0, 0, 0, 5, 0
        ];

    assert.deepEqual(game.findPath(0, 24), 
        [0, 5, 10, 15, 20, 21, 22, 17, 12, 7, 2, 3, 4, 9, 14, 19, 24]);
    game.setBall(2, 6);
    assert.notOk(game.findPath(0, 24));
});
