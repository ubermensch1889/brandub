import React from 'react';

import '../index.css';
import Square from './Square.jsx';

export default class Board extends React.Component {

    renderSquare(i) {
        if (i === 0 || i === 6 || i === 42 || i === 48 || i === 24) {
            return <Square
                piece = {this.props.squares[i]}
                style = 
                    {
                        this.props.squares[i] ?
                        {
                            backgroundImage: this.props.squares[i].style.backgroundImage + ", url('https://i.imgur.com/vCoMFU1.png')",
                            backgroundPosition: "center",
                            backgroundColor: this.props.squares[i].style.backgroundColor
                        }   
                        :
                        {
                            backgroundImage: "url('https://i.imgur.com/vCoMFU1.png')",
                            backgroundPosition: "center"
                        }
                    }
                onClick={() => this.props.onClick(i)}
                key = {i}
            />
        }
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
            <div className="outer-div">
                <div className="board">
                    {board}
                </div>
            </div>
        );
    }
}
