import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./Components/GlobalStyles";
import "./Fonts/css/all.css";
import { AuthProvider } from "./Contexts/AuthContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </AuthProvider>
);
