import classNames from "classnames/bind";
import styles from "./Login.module.scss";

//component
import { useState, useContext } from "react";
import { Alert, Button, Snackbar, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import httpRequest from "../../util/HttpRequest.js";
// import { Auth } from "~/contexts/authContext";

const cx = classNames.bind(styles);

const ColorButton = styled(Button)(({ theme }) => ({
    color: "white",
    margin: 10,
    padding: 10,
    backgroundColor: "#000000",
    borderRadius: 5,
    fontSize: 16,
    "&:hover": {
        backgroundColor: "#2C2C2C",
    },
}));

function Login() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    // const [Register, setRegister] = useState(true);
    const [Message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // const { state, dispatch } = useContext(Auth);
    // const { userInfo } = state;

    const handleSubmit = async () => {
        if (account.trim() === "" || password.trim() === "") {
            setMessage("Empty Field");
            setOpen(true);
            return;
        }
        // try {
        //     const { data } = await httpRequest.post("/api/auth/signup", {
        //         name: Name,
        //         email: Email,
        //         password: Password,
        //     });
        //     dispatch({
        //         type: "USER_SIGNIN",
        //         payload: data,
        //     });
        //     localStorage.setItem("userInfo", JSON.stringify(data));
        //     navigate("/login");
        // } catch (err) {
        //     setMessage("Email is already Exist");
        //     setOpen(true);
        //     return;
        // }
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={cx("wrapper")}>
            <h1>Zola Admin</h1>
            <form className={cx("form-signup")}>
                <input
                    placeholder="Account"
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
