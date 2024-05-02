import React, { useEffect, useState } from 'react';
import { addCustomer, updateCustomer } from '../../Store/CustomerReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { RootState } from '../../Store/Store';
import { CustomerIdParam } from '../../Store/Type/TypeGlobal';
import { BUTTON_TEXT, ERROR_MESSAGE, LABLE_TEXT, PLACE_HOLDER_TEXT, SCREEN_TITLE, TOAST_MESSAGE_VALUE } from '../../Utility/Constant';
import { showNotification } from '../../Components/ToastMessage';
import { onValidateElements } from '../../Utility/ValidateFunction';

export default function AddCustomer() {

    //Edit Request Params
    const { id } = useParams<CustomerIdParam>();
    const customerID = parseInt(id, 10);

    //Store Value
    const customerDetails = useSelector((state: RootState) => state.customer);

    //Local state variable
    const [customerForm, setcustomerForm] = useState({ customerName: "", customerEmail: "" });

    //Check the Existing User Present
    const existingUser = customerDetails.filter(user => user.id === customerID);

    useEffect(() => {
        if (existingUser[0] !== undefined && existingUser[0] !== null) {
            const { name, email } = existingUser[0];
            setcustomerForm((prevState) => ({
                ...prevState,
                customerEmail: email,
                customerName: name
            }))
        }
    }, [])


    //Dispatch Action
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //OnSubmit
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const isVaild = onValidateElements(customerForm.customerName, customerForm.customerEmail);
        if (isVaild) {
            event.preventDefault();
            if (customerID > 0) {
                dispatch(updateCustomer({
                    id: customerID,
                    name: customerForm.customerName,
                    email: customerForm.customerEmail
                }))
                showNotification(ERROR_MESSAGE.EDIT_CUSTOMER, TOAST_MESSAGE_VALUE.SUCCESS);
            }
            else {
                showNotification(ERROR_MESSAGE.CREATE_CUSTOMER, TOAST_MESSAGE_VALUE.SUCCESS);
                dispatch(addCustomer({ id: customerDetails.length > 0 ? customerDetails[customerDetails.length - 1].id + 1 : customerDetails.length + 1, name: customerForm.customerName, email: customerForm.customerEmail }));
            }
            navigate('/customerdashboard');
        }
    }

    //Render Elements
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border  p-5'>
            {
                    customerID !== 0 ?
                        <h3>{SCREEN_TITLE.EDIT_NEW_CUSTOMER}</h3>
                        :
                        <h3>{SCREEN_TITLE.ADD_NEW_CUSTOMER}</h3>
                }
                <div>
                    <div>
                        <label htmlFor="customerName">{LABLE_TEXT.CUSTOMER_NAME}</label>
                        <input type="text" name='customerName' className='form-control' placeholder={PLACE_HOLDER_TEXT.CUSTOMER_NAME}
                            value={customerForm.customerName} onChange={(e) => {
                                setcustomerForm((prevState) => ({
                                    ...prevState,
                                    customerName: e.target.value
                                }))
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="customerEmail">{LABLE_TEXT.CUSTOMER_EMAIL}</label>
                        <input type="email" name='customerEmail' className='form-control' placeholder={PLACE_HOLDER_TEXT.CUSTOMER_EMAIL}
                            value={customerForm.customerEmail} onChange={(e) => {
                                setcustomerForm((prevState) => ({
                                    ...prevState,
                                    customerEmail: e.target.value
                                }))
                            }}
                        />
                    </div><br />
                    <button className='btn btn-info' onClick={(e) => { handleSubmit(e) }}>{BUTTON_TEXT.SUBMIT}</button>
                </div>
            </div>
        </div>
    );
}
