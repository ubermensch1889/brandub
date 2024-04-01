import {Fragment, useEffect, useState} from 'react'
import Header from "@/components/header/Header.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import useInterval from "@/hooks/useInterval.js";
import axios from "axios";
import CopyableText from "@/components/CopyableText/CopyableText.jsx";

export default function WaitAnotherSide() {
    let [searchParams, setSearchParams] = useSearchParams()
    const id = searchParams.get("id")
    const side = searchParams.get("side")
    const navigate = useNavigate()
    
    useEffect(() => {
        document.title = 'Ожидание второго игрока';
    }, []);

    // функция для получения информации о том, подключился ли второй игрок
    async function checkGameStarted(setData) {
        try {
            const response = await axios.get(`https://localhost:7048/multiplayer/get-start/${id}`)
            console.log(response)
            if (!response.status) {
                throw new Error('Network response was not ok');
            }
            const data = await response.data;
            console.log(data)

            if (data) {
                navigate(`/online-multiplayer/game?id=${id}&side=${side}`)
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
    
    useInterval(() => checkGameStarted(), 1000)
    
    return (
        <Fragment>
            <Header/>
            <CopyableText>{`https://${window.location.host}/online-multiplayer/game?id=${id}&side=${side === "attacker" ? "defender" : "attacker"}`}</CopyableText>
        </Fragment>
    )
}