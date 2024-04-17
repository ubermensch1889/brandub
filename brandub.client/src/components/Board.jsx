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
                            backgroundImage: this.props.squares[i].style.backgroundImage + ", url('https://psv4.userapi.com/c909228/u179121380/docs/d46/b69f199aecf3/output-onlinepngtools.png?extra=8ZRdnhnLlQ6E8I8eHM-1YBgvhSnLQRHdWEb2C6MnfnSqlaXYyYTffyvxMWoFgmgr5zWDylFXd5RtzLXNlAnGLvKLGDk43mkDij9myJx1UIEyRWZb123njzpw81WP15QYCnMP__9KE2QCImaft6Bz4eZiCw')",
                            backgroundPosition: "center"
                        }   
                        :
                        {
                            backgroundImage: "url('https://psv4.userapi.com/c909228/u179121380/docs/d46/b69f199aecf3/output-onlinepngtools.png?extra=8ZRdnhnLlQ6E8I8eHM-1YBgvhSnLQRHdWEb2C6MnfnSqlaXYyYTffyvxMWoFgmgr5zWDylFXd5RtzLXNlAnGLvKLGDk43mkDij9myJx1UIEyRWZb123njzpw81WP15QYCnMP__9KE2QCImaft6Bz4eZiCw')",
                            backgroundPosition: "center",
                            backgroundSize: "95% 80%",
                            backgroundRepeat: "no-repeat"
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
            <div className="board">
                {board}
            </div>
        );
    }
}
