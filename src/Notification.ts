import { toast } from 'react-toastify';

export const successNotify = (message : string) => {
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const errorNotify = (message : string) => {
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export const warningNotify = (message : string) => {
    toast.warning(message, {
        position: toast.POSITION.TOP_RIGHT
    });
}