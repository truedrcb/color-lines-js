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
                className: 'col tile bCLOUDS', 
                onClick: function() {
                    props.onTileClick(props.tileIndex);
                }
            }, 
            e('i', {className: 'fas fa-fw'
                + (color ? (' fa-bowling-ball ' + color) : ' fa-bowling-ball CLOUDS') 
                + (props.selected ? ' fa-spin' : '')
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
                        selected: i == props.selected,
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
        for (var i = 0; i < 30; i++) {
            this.game.randomBallOnFreeTile();
        }
        this.state = {
            board: this.game.getBoard(), 
            selected: 1
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    render() {
        return e(PlayField, {
            board: this.state.board, 
            selected: this.state.selected,
            onTileClick: this.handleSelect
        });
    }

    handleSelect(tileIndex) {
        console.log("Tile clicked:");
        console.log(tileIndex);
        if (this.game.getBall(tileIndex)) {
            // move focus
        } else if (this.game.getBall(this.state.selected)) {
            this.game.moveBall(this.state.selected, tileIndex);
            this.game.randomBallOnFreeTile();
            tileIndex = -1;
        }
        this.setState({
            board: this.game.getBoard(), 
            selected: tileIndex
        });
    }
}



ReactDOM.render(e(App), document.querySelector('#color_lines_container'));
ReactDOM.render(e(LikeButton), document.getElementById('like_button_container'));