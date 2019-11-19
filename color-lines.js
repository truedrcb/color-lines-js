'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false
        };
    }

    render() {
        if (this.state.liked) {
            return 'You liked this.';
        }

        return e(
            'button', {
                onClick: () => this.setState({
                    liked: true
                }),
                className: "btn btn-primary"
            },
            'Like'
        );
    }
}

const colors = [
    'POMEGRANATE', //red,
    'WISTERIA', //magenta,
    'BELIZE-HOLE', //blue,
    'TURQUOISE', //cyan,
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
        return e('div', {
                className: 'col tile' 
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
        )        
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
            rows.push(e('div', {key: y, className: 'row'}, cells));
        }

        return e('div', {className: 'container'}, rows);
    }

}


class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("test color lines");
        this.game = new Game();
        for (var i = 0; i < 5; i++) {
            this.game.randomBallOnFreeTile();
        }
        this.state = {
            board: this.game.getBoard(), 
            selectedIndex: 1,
            unselectedIndex: 10,
            appearedIndices: [],
            path: []
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return e(PlayField, {
            board: this.state.board, 
            selectedIndex: this.state.selectedIndex,
            unselectedIndex: this.state.unselectedIndex,
            appearedIndices: this.state.appearedIndices,
            path: this.state.path,
            onTileClick: this.handleSelect
        });
    }

    handleSelect(tileIndex) {
        console.log("Tile clicked:");
        console.log(tileIndex);
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
                    this.game.moveBall(this.state.selectedIndex, tileIndex);
                    appearedIndices.push(this.game.randomBallOnFreeTile());
                    appearedIndices.push(this.game.randomBallOnFreeTile());
                    appearedIndices.push(this.game.randomBallOnFreeTile());
                    console.log("new balls: " + appearedIndices);
                    tileIndex = -1;
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
            path: path
        });
    }
}



ReactDOM.render(e(App), document.querySelector('#color_lines_container'));
ReactDOM.render(e(LikeButton), document.getElementById('like_button_container'));