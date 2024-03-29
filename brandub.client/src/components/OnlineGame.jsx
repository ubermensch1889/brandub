import '../index.css';
import Game from "@/components/Game.jsx";
import axios from "axios";
import ResultModal from "@/components/ResultModal/ResultModal.jsx";
import Board from "@/components/Board.jsx";
import React from "react";

export default class OnlineGame extends Game {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            squares: this.props.board,
            setBoard: this.props.setBoard,
            sourceSelection: -1,
            // -1 означает, что фигура еще не выбрана
            status: '',
            turn: this.props.turn,
            winner: 'none',
            side: this.props.side
        }
    }

    async handleClick(i) {
        // не наша очередь ходить
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

            console.log(isMovePossible.toString())
            console.log(isMoveLegal.toString())


            if (isMovePossible && isMoveLegal) {
                squares[i] = squares[this.state.sourceSelection];
                squares[this.state.sourceSelection] = null;

                let turn = this.state.turn === 'attacker' ? 'defender' : 'attacker';
                const winner = this.getWinner(squares)

                if (winner === "attacker") {
                    console.log("winn")
                    this.setState({winner: "attacker"})
                } else if (winner === "defender") {
                    console.log("winn")
                    this.setState({winner: "defender"})
                }

                // проверяем, съел ли кто-нибудь кого-нибудь
                this.HandleEaten(squares)

                this.state.setBoard(squares)
                this.props.setTurn(turn)
                this.props.setMoveIsMade(true)
                console.log("post")
                const res = await axios.post(`https://localhost:7048/multiplayer/make-move`, {
                    id: this.props.id,
                    side: this.state.side === "attacker",
                    board: Array.from(squares).map(square => square === null ? null : square.isKing() ? "king" : square.player)
                })
                // ).then(res => console.log(res)).catch(err => console.log(err))
                console.log(res)
                console.log(squares)
                console.log("asd")

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

    deleteGame() {
        // TODO: сделать нормальное логирование
        axios.delete(`https://localhost:7048/multiplayer/${this.props.id}`).catch(err => console.log(err))
    }

    render() {
        const squares = this.state.squares
        const winner = this.getWinner(squares)
        
        
        // удаляем из бд игру, так как игры закончилась и мы получили ход (т.е. мы последние обращаемся к серверу)
        if (winner !== "none") {
            this.props.setOver(true)
            if (this.state.turn === this.state.side) {
                this.deleteGame()
            }
        }
        
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
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={this.state.squares}
                            onClick={(i) => this.handleClick(i)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
