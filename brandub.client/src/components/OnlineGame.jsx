import React from 'react';
import { useState } from 'react'
import '../index.css';
import Board from './Board.jsx';
import initialiseBoard from '../game/initialiseBoard.js'
import ResultModal from "@/components/ResultModal/ResultModal.jsx";
import Game from "@/components/Game.jsx";
import useInterval from "@/hooks/useInterval.js";
import axios from "axios";

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
        //console.log(this.state)
    }
}
