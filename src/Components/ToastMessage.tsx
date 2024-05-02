import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_MESSAGE_VALUE } from '../Utility/Constant';

export const showNotification = (message, type) => {
    debugger
    if (type === TOAST_MESSAGE_VALUE.ERROR) {
        toast.error(message, {
            position: "top-right"
        });
    } else if (type === TOAST_MESSAGE_VALUE.WARNING) {
        toast.warn(message, {
            position: "top-right"
        });
    } else {
        toast.success(message, {
            position: "top-right"
        });
    }
};