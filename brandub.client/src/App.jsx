import { useEffect, useState } from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Start from "@/pages/Start.jsx";
import MultiplayerOnOneDevice from "@/pages/MultiplayerOnOneDevice.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Start />} />
                <Route path="/multiplayer_on_one_device" element={<MultiplayerOnOneDevice />} />
            </Routes>
        </Router>
    );
}

export default App;