import React from 'react';
import { useState } from 'react'

import '../index.css';
import Board from './Board.jsx';
import King from '../game/pieces/King.js'
import initialiseBoard from '../game/initialiseBoard.js'
import ResultModal from "@/components/ResultModal/ResultModal.jsx";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: initialiseBoard(),
            sourceSelection: -1,
            // -1 означает, что фигура еще не выбрана
            status: '',
            turn: 'attacker',
            winner: 'none'
        }
    }
    
    // метод для проверки наличия съеденных фигур
    handleEaten(squares) {
        // по-хорошему этот код надо переделать, он мне не нравится
        for (let i = 0; i < squares.length - 2; ++i) {
            if (squares[i] && squares[i + 1]
                && squares[i + 2]
                && squares[i + 1].player !== squares[i].player
                && squares[i].player === squares[i + 2].player && !squares[i + 1].isKing()) {
                squares[i + 1] = null
            }
            if (i + 14 < squares.length && squares[i] 
                && squares[i + 7]
                && squares[i + 14]
                && squares[i + 7].player !== squares[i].player
                && squares[i].player === squares[i + 14].player && !squares[i + 14].isKing()) {
                squares[i + 7] = null
            }
        }
    }

    handleClick(i) {
        const squares =  this.state.squares;

        if (this.state.sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== this.state.turn) {
                this.setState({ status: "Wrong selection. Choose player " + this.state.player + " pieces." })
                if (squares[i]) {
                    squares[i].style = { ...squares[i].style, backgroundColor: "" };
                }
            }
            else {
                squares[i].style = { ...squares[i].style, backgroundColor: "RGB(111,143,114)" }; 
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                })
            }
            return
        }

        squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };

        if (squares[i]) {
            this.setState({
                status: "Wrong selection. This square is already occupied. Choose valid source and destination again.",
                sourceSelection: -1
            })
        }
        else {
            const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i)
            const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i)
            // проверка на наличие других фигур на пути
            const isMoveLegal = this.isMoveLegal(srcToDestPath);

            if (isMovePossible && isMoveLegal) {
                squares[i] = squares[this.state.sourceSelection];
                squares[this.state.sourceSelection] = null;
                
                let turn = this.state.turn === 'attacker' ? 'defender' : 'attacker';
                const winner = this.getWinner(squares)
                
                if (winner === "attacker") {
                    this.setState( { winner: "attacker" })
                }
                
                else if (winner === "defender") {
                    this.setState( { winner: "defender" })
                }
                
                else {
                    // проверяем, съел ли кто-нибудь кого-нибудь
                    this.handleEaten(squares)
                }
                
                this.setState(oldState => ({ 
                    sourceSelection: -1,
                    status: '',
                    turn: turn
                }));
            }
            else {
                this.setState({
                    status: "Wrong selection. Choose valid source and destination again.",
                    sourceSelection: -1,
                });
            }
        }
    }

    render() {
        const squares = this.state.squares
        const winner = this.getWinner(squares)
        
        return (
            <div>
                <ResultModal visible={winner !== "none"}>
                    <h2>{winner === "defender" ?
                        "Защитники победили!" :
                        "Атакующие победили!"}
                        <div className="button-holder">
                            <form action="/">
                                <input type="submit" value="Вернуться на главную страницу"/>
                            </form>
                        </div>
                    </h2>
                </ResultModal>
                <div className="centered-container">
                    <div className="game">
                        <div className="game-board">
                            <Board
                                squares={this.state.squares}
                                onClick={(i) => this.handleClick(i)}
                            />
                        </div>
                    </div>
                </div>
                <div className="centered-container">
                    <div className="turn-window">
                        <p style={{textAlign: "center"}}>Ход {this.state.turn === "attacker" ? "атакующих" : "защитников"}</p>
                    </div>
                </div>
            </div>
        );
    }

    isMoveLegal(srcToDest) {
        for (let i = 0; i < srcToDest.length; ++i) {
            if (this.state.squares[srcToDest[i]]) return false;
        }
        return true;
    }

    getWinner(squares) {
        // "none", если никто не победил
        
        // случай победы защитников, когда они сумели довести короля до одного из углов
        if (squares[0] && squares[0].isKing()) {
            return "defender"
        }

        if (squares[6] && squares[6].isKing()) {
            return "defender"
        }

        if (squares[42] && squares[42].isKing()) {
            return "defender"
        }

        if (squares[48] && squares[48].isKing()) {
            return "defender"
        }
        
        // проверка на то, съели ли короля, но мы делаем это до самого взятия, чтобы было как в шахматах
        for (let i = 0; i < squares.length - 2; ++i) {
            if (squares[i] && squares[i + 1]
                && squares[i + 2]
                && squares[i + 1].player !== squares[i].player
                && squares[i].player === squares[i + 2].player
                && squares[i + 1].isKing()) {
                
                return "attacker"
                
            }
            if (i + 14 < squares.length && squares[i]
                && squares[i + 7]
                && squares[i + 14]
                && squares[i + 7].player !== squares[i].player
                && squares[i].player === squares[i + 14].player
                && squares[i + 7].isKing()) {
                
                return "attacker"
            }
        }
        
        return "none"
    }
}
