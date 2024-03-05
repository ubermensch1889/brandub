import React from 'react';

import '../index.css';
import Square from './Square.jsx';

export default class Board extends React.Component {

    renderSquare(i) {
        return <Square
            piece = {this.props.squares[i]}
            style = {this.props.squares[i] ? this.props.squares[i].style : null}
            onClick={() => this.props.onClick(i)}
            key = {i}
        />
    }

    render() {
        const board = [];
        for(let i = 0; i < 7; i++){
            const squareRows = [];
            for(let j = 0; j < 7; j++){
                squareRows.push(this.renderSquare((i*7) + j));
            }
            board.push(<div className="board-row" key={i}>{squareRows}</div>)
        }

        return (
            <div>
                {board}
            </div>
        );
    }
}

function isEven(num){
    return num % 2 == 0
}
