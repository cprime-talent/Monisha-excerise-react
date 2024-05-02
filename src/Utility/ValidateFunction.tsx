import { showNotification } from "../Components/ToastMessage";
import { ERROR_MESSAGE, TOAST_MESSAGE_VALUE } from "./Constant";

export const onValidateEmail = (email: string) => {
    let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (reg.test(email)) {
        return true;
    } else {
        return false;
    }
}

export const onValidateElements =(...theParams: any)=>{
    if (!theParams[0]) {
        showNotification(ERROR_MESSAGE.NAME_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (!theParams[1]) {
        showNotification(ERROR_MESSAGE.EMAIL_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (!onValidateEmail(theParams[1].trim())) {
        showNotification(ERROR_MESSAGE.VAILD_EMAIL_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (!theParams[2] && theParams[2]!==undefined) {
        showNotification(ERROR_MESSAGE.MOBILE_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (theParams[2]!==undefined && theParams[2].length > 10) {
        showNotification(ERROR_MESSAGE.MIN_MOBILE_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (!theParams[3] && theParams[3]!==undefined) {
        showNotification(ERROR_MESSAGE.PASSWORD_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (!theParams[4] && theParams[4]!==undefined) {
        showNotification(ERROR_MESSAGE.CONFRIM_PASS_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }

    if (theParams[3] !== theParams[4] && theParams[3]!==undefined) {
        showNotification(ERROR_MESSAGE.MATCH_PASS_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }
    return true;
}

export const onLoginValidate =(...theParams:any)=>{
    if (!theParams[0]) {
        showNotification(ERROR_MESSAGE.EMAIL_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }
    if (!onValidateEmail(theParams[0].trim())) {
        showNotification(ERROR_MESSAGE.VAILD_EMAIL_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }
    if (!theParams[1]) {
        showNotification(ERROR_MESSAGE.PASSWORD_ERROR, TOAST_MESSAGE_VALUE.ERROR);
        return false;
    }
    return true;
}