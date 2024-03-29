﻿import {Fragment, useCallback, useState} from 'react'
import MultiplayerModeChoiceModal from "@/components/MultiplayerModeChoiceModal/MultiplayerModeChoiceModal.jsx";
import {useNavigate} from "react-router-dom";

function Start() {
    const [modal, setModal] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [side, setSide] = useState("attacker")
    
    const navigate = useNavigate()

    const createGame = async () =>
    {
        // отправляем запрос на создание игровой сессии
        if (isSending) return
        setIsSending(true)

        const response = await fetch("create-online-game", {
            method: "POST"
        });
        const data = await response.text();
        console.log(side)
        navigate(`online-multiplayer/wait?id=${data}&side=${side}`.replace(/"/g, ""))

        setIsSending(false)
    }
    
    const sendRequest = useCallback(createGame, [isSending, side])

    return (
        <Fragment>
            <header>
                <h1>Брандуб</h1>
            </header>
            <div className="container">
                <div className="modes-container">
                    <a href="/offline-multiplayer" className="mode">Игра вдвоем на одном компьютере</a>
                    <div className="gap"></div>
                    <button className="mode" onClick={() => setModal(true)}>Игра с ботом</button>

                    <MultiplayerModeChoiceModal visible={modal} setVisible={setModal}>
                        <h2>
                            Выберите сторону:
                        </h2>
                        <div>
                            <label>
                                <input type="radio" name="myRadio" defaultChecked 
                                       onClick={() => setSide("attacker")} />
                                Атакующие
                            </label>
                            <label>
                                <input type="radio" name="myRadio" onClick={() => setSide("defender")}/>
                                Защитники
                            </label>
                        </div>

                        <input type="button" disabled={isSending} onClick={sendRequest} value="Подтвердить"/>
                    </MultiplayerModeChoiceModal>

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