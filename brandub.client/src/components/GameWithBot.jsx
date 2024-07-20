import '../index.css';
import Game from "@/components/Game.jsx";
import axios from "axios";
import ResultModal from "@/components/ResultModal/ResultModal.jsx";
import Board from "@/components/Board.jsx";
import React from "react";
import initialiseBoard from "@/game/initialiseBoard.js";
import AttackerBot from "@/bot/AttackerBot.js";
import DefenderBot from "@/bot/DefenderBot.js";

export default class GameWithBot extends Game {
    constructor(props) {
        super(props);
        this.state = {
            squares: initialiseBoard(),
            sourceSelection: -1,
            // -1 означает, что фигура еще не выбрана
            status: '',
            turn: this.props.side,
            winner: 'none',
            side: this.props.side
        }
        this.bot = this.props.side === "attacker" ? new DefenderBot() : new AttackerBot()
        if (this.state.side === "defender") {
            this.bot.makeMove(this.state.squares)
        }
    }

    async handleClick(i) {
        if (this.state.turn !== this.state.side) {
            return;
        }
        const squares = [...this.state.squares];

        if (this.state.sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== this.state.side) {
                this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."})
                if (squares[i]) {
                    squares[i].style = {...squares[i].style, backgroundColor: ""};
                }
            } else {
                squares[i].style = {...squares[i].style, backgroundColor: "RGB(111,143,114)"}
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                })
            }
            return
        }

        squares[this.state.sourceSelection].style = {...squares[this.state.sourceSelection].style, backgroundColor: ""};

        if (squares[i]) {
            this.setState({
                status: "Wrong selection. This square is already occupied. Choose valid source and destination again.",
                sourceSelection: -1
            })
        } else {
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
                    this.setState({winner: "attacker"})
                } else if (winner === "defender") {
                    this.setState({winner: "defender"})
                } else {
                    // проверяем, съел ли кто-нибудь кого-нибудь
                    this.handleEaten(squares)

                    setTimeout(() => {
                        this.bot.makeMove(squares)
                        this.setState({
                            turn: this.state.side,
                            squares: this.bot.squares
                        })
                        this.handleEaten(this.bot.squares)
                    }, 1000)
                }

                this.setState(oldState => ({
                    sourceSelection: -1,
                    squares: squares,
                    status: '',
                    turn: turn
                }));
            } else {
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
}
