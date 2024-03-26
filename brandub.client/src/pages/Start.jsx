import {Fragment, useCallback, useState} from 'react'
import OfflineMultiplayer from "@/pages/OfflineMultiplayer.jsx";
import MultiplayerModeChoiceModal from "@/components/MultiplayerModeChoiceModal/MultiplayerModeChoiceModal.jsx";
import Button from "@/components/Button/Button.jsx";

function Start() {
    const [modal, setModal] = useState(false)
    const [isSending, setIsSending] = useState(false)
    
    const [attackersAreChosen, setChosen] = useState(true)
     
    const sendRequest = useCallback(async () => {
        if (isSending) return
        setIsSending(true)
        
        let response = await fetch(`create-online-game/${attackersAreChosen}`, {
            method: "GET"
        });
        let data = await response.json();
        console.log(data)
        
        setIsSending(false)
    }, [isSending])

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
                                       onClick={() => setChosen(true)} />
                                Атакующие
                            </label>
                            <label>
                                <input type="radio" name="myRadio" onClick={() => setChosen(false)}/>
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