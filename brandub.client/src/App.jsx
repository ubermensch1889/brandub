import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Start from "@/pages/Start.jsx";
import OfflineMultiplayerPage from "@/pages/OfflineMultiplayer.jsx";
import WaitAnotherSidePage from "@/pages/WaitAnotherSide.jsx";
import OnlineMultiplayerPage from "@/pages/OnlineMultiplayer.jsx";
import GameWithBotPage from "@/pages/GameWithBotPage.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Start />} />
                <Route path="/offline-multiplayer" element={<OfflineMultiplayerPage />} />
                <Route path="/online-multiplayer/wait" element={<WaitAnotherSidePage />} />
                <Route path="/online-multiplayer/game" element={<OnlineMultiplayerPage />} />
                <Route path="/game-with-bot" element={<GameWithBotPage />} />
            </Routes>
        </Router>
    );
}

export default App;