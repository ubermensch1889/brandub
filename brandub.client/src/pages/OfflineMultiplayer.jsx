import Game from "@/components/Game.jsx";
import {Fragment, useEffect} from 'react'
import Header from "@/components/header/Header.jsx";

export default function OfflineMultiplayer() {
    useEffect(() => {
        document.title = 'Игра';
    }, []);
    
    return (
        <Fragment>
            
            <Header></Header>
            <Game />
        </Fragment>
    )
}