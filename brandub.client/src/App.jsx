import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Start from "@/pages/Start.jsx";
import OfflineMultiplayer from "@/pages/OfflineMultiplayer.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Start />} />
                <Route path="/offline-multiplayer" element={<OfflineMultiplayer />} />
                {/*<Route path="/online-multiplayer" element={<OnlineMultiplayer />} />*/}
            </Routes>
        </Router>
    );
}

export default App;