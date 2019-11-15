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
                class: "btn btn-primary"
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

    }

}


console.log("test color lines");

const domContainer = document.querySelector('#color_lines_container');
ReactDOM.render(e(LikeButton), domContainer);