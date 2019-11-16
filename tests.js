QUnit.test("Game board initialization", function (assert) {
    var game = new Game();
    assert.strictEqual(game.getBoard().length, 81, "Corect board size");
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
    assert.strictEqual(game.getBoard().length, 4, "Corect board size");
});

QUnit.test("3x3 Game board initialization", function (assert) {
    var game = new Game(3);
    assert.strictEqual(game.getBoard().length, 9, "Corect board size");
});

QUnit.test("5x10 Game board initialization", function (assert) {
    var game = new Game(5, 10);
    assert.strictEqual(game.getBoard().length, 50, "Corect board size");
    game.getBoard().forEach(tile => {
        assert.strictEqual(tile, 0, "Tile is empty");
    });
    assert.ok(game.getSelectedIndex() < 0, "Nothing selected");
    assert.strictEqual(game.countBalls(), 0, "No balls in game");
});
