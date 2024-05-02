import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Service/Firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../Store/LoginReducer";
import { showNotification } from "../../Components/ToastMessage";
import { BUTTON_TEXT, ERROR_MESSAGE, LABLE_TEXT, PLACE_HOLDER_TEXT, SCREEN_TITLE, TOAST_MESSAGE_VALUE } from "../../Utility/Constant";
import { onValidateElements } from "../../Utility/ValidateFunction";

const CreateAccount = () => {

    //Local state variable
    const [createAccountDetails, setCreateAccountDetails] = useState({ name: "", email: "", phoneNumber: "", createPassword: "", confirmPassword: "" });
    const [loader, setLoader] = useState(false);

    //Dispatch Action
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Create a account in the Firebase
    const onCreateForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
       const isVaild = onValidateElements(createAccountDetails.name,createAccountDetails.email,createAccountDetails.phoneNumber,createAccountDetails.createPassword,createAccountDetails.confirmPassword);
       if(isVaild){
        setLoader(true);
        createUserWithEmailAndPassword(auth, createAccountDetails.email, createAccountDetails.confirmPassword)
            .then((userCredential) => {
                setLoader(false);
                console.log(userCredential);
                showNotification(ERROR_MESSAGE.CREATE_ACCOUNT_SUCCESS, TOAST_MESSAGE_VALUE.SUCCESS);
                dispatch(createUser({ name: createAccountDetails.name, email: createAccountDetails.email, phoneNumber: createAccountDetails.phoneNumber, createPassword: createAccountDetails.createPassword, confirmPassword: createAccountDetails.confirmPassword }));
                navigate('/customerdashboard');
            })
            .catch((error) => {
                setLoader(false);
                showNotification(ERROR_MESSAGE.CREATE_ACCOUNT_FAILED, TOAST_MESSAGE_VALUE.ERROR);
                console.log(error);
            });
        }
    };

    //Render Elements
    return (
        <div className="Auth-form-container">
            <div className="Auth-form" >
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">{SCREEN_TITLE.CREATE_ACCOUNT}</h3>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.NAME}</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder={PLACE_HOLDER_TEXT.NAME}
                            onChange={(e) => {
                                let name = e.target.value.replace(
                                    /[^a-zA-Z ]/g,
                                    ""
                                );
                                setCreateAccountDetails((prevState) => ({
                                    ...prevState,
                                    name: name
                                }))
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.EMAIL}</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder={PLACE_HOLDER_TEXT.EMAIL}
                            onChange={(e) => {
                                setCreateAccountDetails((prevState) => ({
                                    ...prevState,
                                    email: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.MOBILE}</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder={PLACE_HOLDER_TEXT.MOBILE}
                            onChange={(e) => {
                                setCreateAccountDetails((prevState) => ({
                                    ...prevState,
                                    phoneNumber: e.target.value.replace(/\D/, "")
                                }))
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.CREATE_PASSWORD}</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder={PLACE_HOLDER_TEXT.CREATE_PASSWORD}
                            onChange={(e) => {
                                setCreateAccountDetails((prevState) => ({
                                    ...prevState,
                                    createPassword: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>{LABLE_TEXT.CONFIRM_PASSWORD}</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder={PLACE_HOLDER_TEXT.CONFIRM_PASSWORD}
                            onChange={(e) => {
                                setCreateAccountDetails((prevState) => ({
                                    ...prevState,
                                    confirmPassword: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" disabled={loader} className="btn btn-primary" onClick={(e) => { onCreateForm(e) }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {loader ?
                                    'Loading...' : null}
                            </div> {loader ? '' : BUTTON_TEXT.SUBMIT}
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        <a href="/">{SCREEN_TITLE.BACK_TO_LOGIN}</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;