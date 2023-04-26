import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import axios from "./../../Hooks/axios.js";
//component
import { useState, useContext, useEffect } from "react";
import { Alert, Button, Snackbar, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../Contexts/AuthContext.js";

const cx = classNames.bind(styles);

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    margin: 10,
    padding: 10,
    backgroundColor: "#48C672",
    borderRadius: 5,
    fontSize: 16,
    "&:hover": {
        backgroundColor: "#48C672",
    },
}));

function Login() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    // const [Register, setRegister] = useState(true);
    const [Message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { state, dispatch } = useContext(Auth);
    const { adminInfo } = state;
    useEffect(() => {
        if (adminInfo) {
            navigate("/home");
        }
    }, [navigate, adminInfo]);

    const handleSubmit = async () => {
        if (account.trim() === "" || password.trim() === "") {
            setMessage("Empty Field");
            setOpen(true);
            return;
        }
        try {
            const { data } = await axios.post("/admin/signin", {
                account: account,
                password: password,
            });
            dispatch({
                type: "ADMIN_LOGIN",
                payload: data,
            });
            localStorage.setItem("adminInfo", JSON.stringify(data));
            navigate("/home");
        } catch (err) {
            setMessage("Invalid Account or Password");
            setOpen(true);
            return;
        }
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx("wrapper")}>
            <h1 style={{ color: "#48C672" }}>Zola Admin</h1>
            <form className={cx("form-signup")}>
                <input
                    placeholder="Tài khoản"
                    onChange={(e) => {
                        setAccount(e.target.value);
                    }}
                    name="account"
                />{" "}
                <br></br>
                <input
                    placeholder="Mật khẩu"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    name="pass"
                />{" "}
            </form>
            <ColorButton className={cx("btn-signup")} onClick={handleSubmit}>
                Đăng nhập
            </ColorButton>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="warning"
                    sx={{ width: "100%" }}
                >
                    {Message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Login;
