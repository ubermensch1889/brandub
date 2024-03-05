import Game from "@/components/Game.jsx";
import { Fragment } from 'react'
import Header from "@/components/header/Header.jsx";

export default function MultiplayerOnOneDevice() {
    return (
        <Fragment>
            <Header></Header>
            <Game />
        </Fragment>
    )
}