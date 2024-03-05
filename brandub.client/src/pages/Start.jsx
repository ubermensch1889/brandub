import { Fragment } from 'react'
import MultiplayerOnOneDevice from "@/pages/MultiplayerOnOneDevice.jsx";

function Start() {
    return (
        <Fragment>
            <header>
                <h1>Брандуб</h1>
            </header>
            <div className="container">
                <div className="modes-container">
                    <a href="/multiplayer_on_one_device" className="mode">Игра вдвоем на одном компьютере</a>
                    <div className="gap"></div>
                    <a href="#" className="mode">Игра с ботом</a>
                    <div className="gap"></div>
                    <a href="#" className="mode">Игра онлайн</a>
                </div>
                <div className="rules">
                    <h2>Правила игры "Брандуб"</h2>
                    <p>Здесь будут описаны правила игры "Брандуб".</p>
                </div>
            </div>
        </Fragment>
    );
}

export default Start