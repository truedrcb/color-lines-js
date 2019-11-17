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
