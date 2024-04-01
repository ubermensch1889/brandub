import Game from "@/components/Game.jsx";
import {Fragment, useEffect, useState} from 'react'
import Header from "@/components/header/Header.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import OnlineGame from "@/components/OnlineGame.jsx";
import useInterval from "@/hooks/useInterval.js";
import initialiseBoard from "@/game/initialiseBoard.js";
import Attacker from "@/game/pieces/Attacker.js";
import Defender from "@/game/pieces/Defender.js";
import King from "@/game/pieces/King.js";

function getBoardFromData(data) {
    const squares = Array(49).fill(null);
    
    for (let i = 0; i < 49; ++i) {
        if (data[i] === 1) {
            squares[i] = new Attacker()
        }
        else if (data[i] === 2) {
            squares[i] = new Defender()
        }
        else if (data[i] === 3) {
            squares[i] = new King()
        }
    }
    
    return squares
}

export default function OnlineMultiplayer() {
    useEffect(() => {
        document.title = "Онлайн игра";
    }, []);
    
    const [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    const side = searchParams.get("side")
    const navigate = useNavigate()
    const [board, setBoard] = useState(initialiseBoard())
    const [turn, setTurn] = useState("attacker")
    const [moveIsMade, setMoveIsMade] = useState(side !== "attacker")
    const [isOver, setOver] = useState(false)
    
    useEffect(() => {
        document.title = 'Игра';
        // посылаем сигнал о подключении
        axios.post(`https://localhost:7048/multiplayer/start/${id}`).then(resp => console.log(resp)).catch(err => console.log(err))
    }, []);

    async function getUpdatedBoard() {
        if (!moveIsMade || isOver) return
        try {
            const response = await axios.get(`https://localhost:7048/multiplayer/get-updated-board/${id}/${side === "attacker"}`)
            console.log("resp:")
            console.log(response)
            if (!response.status) {
                throw new Error('Network response was not ok');
            }
            const data = await response.data;
            console.log("board:")
            console.log(board)
            console.log("data:")
            console.log(data)
            
            if (data.length ) {
                console.log("update set")
                console.log(data)
                setBoard(getBoardFromData(data))
                setTurn(turn === 'attacker' ? 'defender' : 'attacker')
                setMoveIsMade(false)
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useInterval(() => getUpdatedBoard(), 1000)
    
    function WrappedGame() {
        return <OnlineGame setOver={setOver} id={id} side={side} setBoard={setBoard} board={board} turn={turn} setMoveIsMade={setMoveIsMade} setTurn={setTurn}/>
    }
    console.log("rerender in main:")
    console.log(board)
    return (
        <Fragment>
            <Header/>
            <WrappedGame/>
        </Fragment>
    )
}