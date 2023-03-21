import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './Components/GlobalStyles';
import './Fonts/css/all.css';
import { AuthContextProvider } from './Contexts/AuthContext.js';
import { SocketClientContextProvider } from './Contexts/SocketClientContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <SocketClientContextProvider>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </SocketClientContextProvider>
    </AuthContextProvider>,
    {/* </React.StrictMode>, */ }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
