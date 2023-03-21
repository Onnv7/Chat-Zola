import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calling from './Components/Calling/Calling';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import GoiDien from './Test/GoiDien.jsx'
import GoiVIP from './Test/GoiVIP.jsx'
function App() {
    return (
        <BrowserRouter>
            <ToastContainer position="bottom-center" limit={1} autoClose={2000} pauseOnHover={false} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="home" element={<Home />} />
                <Route path="call" element={<Calling />} />
                <Route path="/an" element={<GoiDien />} />
                <Route path="/a" element={<GoiVIP />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
