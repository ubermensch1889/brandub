import {Fragment, useCallback, useEffect, useState} from 'react'
import MultiplayerModeChoiceModal from "@/components/MultiplayerModeChoiceModal/MultiplayerModeChoiceModal.jsx";
import {useNavigate} from "react-router-dom";
import Header from "@/components/header/Header.jsx";

function Start() {
    useEffect(() => {
        document.title = "Главная страница";
    }, []);
    
    const [onlineModal, setOnlineModal] = useState(false)
    const [botModal, setBotModal] = useState(false)
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
            <Header/>
            <div className="container">
                <div className="modes-container">
                    <a href="/offline-multiplayer" className="mode">Игра вдвоем на одном компьютере</a>
                    <div className="gap"></div>
                    <a className="mode" onClick={() => setOnlineModal(true)}>Игра онлайн</a>

                    <MultiplayerModeChoiceModal visible={onlineModal} setVisible={setOnlineModal}>
                        <h2>
                            Выберите сторону:
                        </h2>
                        <div>
                            <label>
                                <input type="radio" name="multiplayerChoice" defaultChecked 
                                       onClick={() => setSide("attacker")} />
                                Атакующие
                            </label>
                            <label>
                                <input type="radio" name="multiplayerChoice" onClick={() => setSide("defender")}/>
                                Защитники
                            </label>
                        </div>

                        <input type="submit" disabled={isSending} onClick={sendRequest} value="Подтвердить"/>
                    </MultiplayerModeChoiceModal>

                    <div className="gap"></div>
                    <a className="mode" onClick={() => setBotModal(true)}>Игра с ботом</a>
                    <MultiplayerModeChoiceModal visible={botModal} setVisible={setBotModal}>
                        <h2>
                            Выберите сторону:
                        </h2>
                        <div>
                            <label>
                                <input type="radio" name="botChoice" defaultChecked
                                       onClick={() => setSide("attacker")} />
                                Атакующие
                            </label>
                            <label>
                                <input type="radio" name="botChoice" onClick={() => setSide("defender")}/>
                                Защитники
                            </label>
                        </div>

                        <input type="submit" onClick={() => navigate(`game-with-bot?side=${side}`)} value="Подтвердить"/>
                    </MultiplayerModeChoiceModal>
                </div>
                <div className="rules">
                    <h2>Правила игры "Брандуб"</h2>
                    <p>
                        Предлагаемые здесь правила основаны на поэтической и археологической информации
                        из статьи Эойна Макуайта, опубликованной в журнале Eigse в 1946 году.
                    </p>
                    <p>Доска для игры выглядит примерно так:</p>
                    <img width="600" src="https://optim.tildacdn.com/tild6238-3233-4536-b834-393038643733/-/format/webp/IMG_4424__.jpg" alt="Доска для игры в Брандуб"/>
                    <p>
                        1. В Брандуб играют два игрока на доске размером 7 на 7,
                        используя 13 фигур: короля, четырех защитников и восемь нападающих.
                    </p>
                    <p>
                        2. Фигуры расставляются так, чтобы король находился в центре, защитники - рядом с ним, а
                        нападающие - за его пределами, образуя ортогональный крест, доходящий до краев доски.
                    </p>
                    <p>
                        3. Нападающие делают первый ход, за ними следует король или защитники, после чего они играют
                        поочередно до тех пор, пока игра не будет закончена.
                    </p>
                    <p>
                        4. Игрок может сделать ход, перемещая фигуру по линии в любом направлении в другую точку,
                        так далеко, как ему заблагорассудится, при условии, что она не поворачивает за угол и
                        не перепрыгивает через другую фигуру (т.е. аналогично ладье из шахмат).
                    </p>
                    <p>
                        5. Только король может остановиться в центральной точке или в одном из четырех углов,
                        хотя другие фигуры могут проходить через центр.
                    </p>
                    <p>
                        6. Чтобы захватить противника, нужно окружить его с двух противоположных сторон двумя своими 
                        фигурами. После этого фигура противника убирается с доски.
                    </p>
                    <p>
                        7. Король может действовать совместно с защитником при захвате, и сам может быть захвачен двумя
                        нападающими.
                    </p>
                    <p>
                        8. Если фигура одновременно заманивает в ловушку двух или трех врагов в разных направлениях,
                        все попавшие в ловушку враги будут захвачены.
                    </p>
                    <p>
                        9. Фигура может перемещаться между двумя противниками без ущерба для себя.
                    </p>
                    <p>
                        10. Любая из сторон может захватить противника, зажав его между одной из своих фигур и
                        угловым полем. На центральном поле этот эффект отсутствует.
                    </p>
                    <p>
                        11. Король и защитники выигрывают игру, если король достигает одного из
                        угловых квадратов.
                    </p>
                    <p>
                        12. Нападающие выигрывают игру, захватывая короля.
                    </p>
                    <p>
                        13. Если игра становится повторяющейся, если у одного из игроков нет доступных ходов или
                        если игроки договариваются об этом, может быть объявлена ничья.
                    </p>
                </div>
            </div>
        </Fragment>
    );
}

export default Start