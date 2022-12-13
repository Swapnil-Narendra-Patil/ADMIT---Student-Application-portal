import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";

import FaceRecognition from "./FaceRecognition";
import UniversityAdmin from "./components/UniversityAdmin";
function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<FaceRecognition />} />
                    <Route exact path="/university-admin" element={<UniversityAdmin />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
