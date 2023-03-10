import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calling from './Components/Calling/Calling';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="home" element={<Home />} />
                <Route path="call" element={<Calling />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
