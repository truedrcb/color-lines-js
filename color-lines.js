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
                cells.push(e('div', {className: 'col tile'}, 
                    e('i', {className: 'fas fa-fw'
                        + (this.props.board[i] ? ' fa-bowling-ball PUMPKIN' : ' CLOUDS') 
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

ReactDOM.render(e(PlayField, {board: [1,2,0,3,4], selected: 1}), document.querySelector('#color_lines_container'));
ReactDOM.render(e(LikeButton), document.getElementById('like_button_container'));