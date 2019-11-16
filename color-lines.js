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
        for (var y = 0; y < this.state.sizeY; y++) {
            var cells = [];
            for (var x = 0; x < this.state.sizeX; x++) {
                var colorIndex = this.props.board[i];
                var color = null;
                if (colorIndex) {
                    if (colorIndex > 0 && colorIndex <= colors.length) {
                        color = colors[colorIndex - 1];
                    }
                }
                cells.push(e('div', {className: 'col tile bCLOUDS'}, 
                    e('i', {className: 'fas fa-fw'
                        + (color ? (' fa-bowling-ball ' + color) : ' fa-bowling-ball CLOUDS') 
                        + (i == this.props.selected ? ' fa-spin' : '')
                        }, '')));
                i++;
            }
            rows.push(e('div', {className: 'row'}, cells));
        }

        return e('div', {className: 'container'}, rows);
    }

}


console.log("test color lines");
var game = new Game();

for (var i = 0; i < 10; i++) {
    game.setBall(Math.floor(Math.random() * 81), Math.floor(Math.random() * 7 + 1));
}

ReactDOM.render(e(PlayField, {board: game.getBoard(), selected: 1}), document.querySelector('#color_lines_container'));
ReactDOM.render(e(LikeButton), document.getElementById('like_button_container'));