import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Service/Firebase";
import { showNotification } from "../../Components/ToastMessage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BUTTON_TEXT, ERROR_MESSAGE, LABLE_TEXT, SCREEN_TITLE, TOAST_MESSAGE_VALUE } from "../../Utility/Constant";
import { presentUserLogin } from "../../Store/LoginReducer";
import { onLoginValidate } from "../../Utility/ValidateFunction";

const Login = () => {

    //Local state variable
    const [signInForm, setSignInForm] = useState({ username: "", password: "" });
    const [loader, setLoader] = useState(false);

    //Dispatch Action
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Login the User using Firebase Auth 
    const onLoginForm = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const isVaild = onLoginValidate(signInForm.username,signInForm.password);
        if(isVaild){
        setLoader(true);
        signInWithEmailAndPassword(auth, signInForm.username.trim(), signInForm.password)
            .then((userCredential) => {
                setLoader(false);
                console.log(userCredential);
                dispatch(presentUserLogin({ username: signInForm.username, password: signInForm.password }));
                showNotification(ERROR_MESSAGE.LOGIN_SUCCESS, TOAST_MESSAGE_VALUE.SUCCESS);
                navigate('/customerdashboard');
            })
            .catch((error) => {
                console.log(error);
                setLoader(false);
                showNotification(ERROR_MESSAGE.LOGIN_FAILED, TOAST_MESSAGE_VALUE.ERROR);
            });
        }
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={onLoginForm}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{SCREEN_TITLE.LOGIN}</h3>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.USERNAME}</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter the Username"
                            onChange={(e) => {
                                setSignInForm((prevState) => ({
                                    ...prevState,
                                    username: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.PASSWORD}</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter the password"
                            onChange={(e) => {
                                setSignInForm((prevState) => ({
                                    ...prevState,
                                    password: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" disabled={loader} className="btn btn-primary">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {loader ?
                                    'loading...' : null}
                            </div> {loader ? '' : BUTTON_TEXT.SUBMIT}
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        <a href="/createUser">{SCREEN_TITLE.CREATE_ACCOUNT}</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;