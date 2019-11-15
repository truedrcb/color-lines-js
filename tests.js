QUnit.test("Game board initialization", function (assert) {
    var game = new Game();
    assert.strictEqual(game.getBoard().length, 81, "Corect board size");
    game.getBoard().forEach(tile => {
        assert.strictEqual(tile, 0, "Tile is empty");
    });
    assert.ok(game.getSelectedIndex() < 0, "Nothing selected");
    assert.strictEqual(game.countBalls(), 0, "No balls in game");
});

QUnit.test("Generate random indices of free tiles", function (assert) {
    var game = new Game();
    game.setTile(0, 1);
});
