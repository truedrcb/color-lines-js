'use strict';

const e = React.createElement;

const colors = [
    'POMEGRANATE', //red,
    'WISTERIA', //magenta,
    'BELIZE-HOLE', //blue,
    'WET-ASPHALT', //cyan,
    'SUN-FLOWER', //yellow,
    'NEPHRITIS', //green,
    'CARROT' //orange
];

class Tile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var props = this.props;
        var color = null;
        if (props.colorIndex) {
            if (props.colorIndex > 0 && props.colorIndex <= colors.length) {
                color = colors[this.props.colorIndex - 1];
            }
        }
        return e('td', {}, e('div', {
                className: 'tile' 
                    + (props.unselected ? ' tile-fade' : '') 
                    + (props.inPath ? ' tile-path' : ''), 
                onClick: function() {
                    props.onTileClick(props.tileIndex);
                }
            }, 
            e('i', {className: 'fa-fw'
                + (color ? (' fas fa-bowling-ball ball ' + color) : ' far fa-circle no-ball') 
                + (props.selected ? ' selected' : '')
            }, '')
        ))        
    }

}

class PlayField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeX: 9,
            sizeY: 9
        };
    }

    render() {
        var rows = [];
        var i = 0;
        var props = this.props;
        for (var y = 0; y < this.state.sizeY; y++) {
            var cells = [];
            for (var x = 0; x < this.state.sizeX; x++) {
                cells.push(
                    e(Tile, {
                        key: x, 
                        tileIndex: i,
                        selected: i == props.selectedIndex,
                        unselected: i == props.unselectedIndex || props.appearedIndices.includes(i),
                        inPath: props.path.includes(i),
                        colorIndex: props.board[i],
                        onTileClick: props.onTileClick
                    })
                );
                i++;
            }
            rows.push(e('tr', {key: y, className: ''}, cells));
        }

        return e('table', {className: 'container'}, e('tbody', {}, rows));
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("test color lines");
        this.game = new Game();
        for (var i = 0; i < 3; i++) {
            this.game.randomBallOnFreeTile();
        }
        this.state = {
            board: this.game.getBoard(), 
            selectedIndex: -1,
            unselectedIndex: -1,
            appearedIndices: [],
            path: [],
            score: 0,
            countTurns: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return e('div', null, [
            e('h2', {key: "head" + this.state.countTurns, className: 'score'}, 'Score: ' + this.state.score),
            e(PlayField, {
                key: "field" + this.state.countTurns,
                board: this.state.board, 
                selectedIndex: this.state.selectedIndex,
                unselectedIndex: this.state.unselectedIndex,
                appearedIndices: this.state.appearedIndices,
                path: this.state.path,
                onTileClick: this.handleSelect
            })]
        );
    }

    handleSelect(tileIndex) {
        console.log("Tile clicked:");
        console.log(tileIndex);
        if (this.state.path && this.state.path.length > 0) {
            console.log("Unexpected click. Ball animation in progress: " + this.state.path);
            return;
        }
        var unselectedIndex = -1;
        var appearedIndices = [];
        var path = [];
        if (this.game.getBall(this.state.selectedIndex)) {
            unselectedIndex = this.state.selectedIndex; 
            if (this.game.getBall(tileIndex)) {
                // move focus
            } else {
                path = this.game.findPath(this.state.selectedIndex, tileIndex);
                if (path) {
                    const timer = setInterval(() => {
                        path = this.state.path;
                        if (path.length >= 2) {
                            this.game.moveBall1Step(path);
                            this.setState({
                                board: this.game.getBoard(), 
                                selectedIndex: this.state.selectedIndex,
                                unselectedIndex: -1,
                                appearedIndices: [],
                                path: path,
                                score: this.state.score,
                                countTurns: this.state.countTurns + 1
                            });
                            return;
                        }
                        clearInterval(timer);
                        if (path.length != 1) {
                            console.error("Unexpected path: " + path);
                            return;
                        }
                        tileIndex = path[0];
                        var score = this.state.score;

                        var lines = this.game.findLongLines(tileIndex);
                        var scoreIncrease = this.game.countScoreIncrease(lines);
                        if (scoreIncrease > 0) {
                            score += scoreIncrease;
                            this.game.eraseLines(lines);
                        } else {
                            for (var i = 0; i < 3; i++) {
                                var randomTileIndex = this.game.randomBallOnFreeTile(); 
                                appearedIndices.push(randomTileIndex);
                                lines = this.game.findLongLines(randomTileIndex);
                                scoreIncrease = this.game.countScoreIncrease(lines);
                                if (scoreIncrease > 0) {
                                    score += scoreIncrease;
                                    this.game.eraseLines(lines);
                                }                            
                            }
                        }
                        console.log("new balls: " + appearedIndices);
    
                        this.setState({
                            board: this.game.getBoard(), 
                            selectedIndex: -1,
                            unselectedIndex: -1,
                            appearedIndices: appearedIndices,
                            path: [],
                            score: score,
                            countTurns: this.state.countTurns + 1
                        });

                    }, 150);
                } else {
                    path = [];
                    tileIndex = this.state.selectedIndex;
                }
            }
        }
        this.setState({
            board: this.game.getBoard(), 
            selectedIndex: tileIndex,
            unselectedIndex: unselectedIndex,
            appearedIndices: appearedIndices,
            path: path,
            score: this.state.score,
            countTurns: this.state.countTurns + 1
        });
    }
}

ReactDOM.render(e(App), document.querySelector('#color_lines_container'));
