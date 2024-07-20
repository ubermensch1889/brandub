import {Fragment, useEffect, useState} from 'react'
import Header from "@/components/header/Header.jsx";
import {useSearchParams} from "react-router-dom";
import GameWithBot from "@/components/GameWithBot.jsx";


export default function GameWithBotPage() {
    useEffect(() => {
        document.title = "Игра с ботом";
    }, []);
    
    const [searchParams, setSearchParams] = useSearchParams()
    const side = searchParams.get("side")
    
    return (
        <Fragment>
            <Header/>
            <GameWithBot side={side}/>
        </Fragment>
    )
}