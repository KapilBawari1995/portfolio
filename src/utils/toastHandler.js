import { toast } from 'react-toastify';

const toastConfig = {
    position: "top-right",
    autoClose: 3000,
};

export const showResponseToast = (status, message = "Operation Completed", type = "success") => {
    if (type === 'success') {
        toast.success(`✅ (${status}) ${message}`, toastConfig);
    } else {
        toast.error(`❌ (${status}) ${message}`, toastConfig);
    }
};