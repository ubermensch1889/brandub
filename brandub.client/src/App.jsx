import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Start from "@/pages/Start.jsx";
import OfflineMultiplayer from "@/pages/OfflineMultiplayer.jsx";
import WaitAnotherSide from "@/pages/WaitAnotherSide.jsx";
import OnlineMultiplayer from "@/pages/OnlineMultiplayer.jsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Start />} />
                <Route path="/offline-multiplayer" element={<OfflineMultiplayer />} />
                <Route path="/online-multiplayer/wait" element={<WaitAnotherSide />} />
                <Route path="/online-multiplayer/game" element={<OnlineMultiplayer />} />

            </Routes>
        </Router>
    );
}

export default App;