import toast from "react-hot-toast";

export function handleToast(res) {
    if (res.success) return toast.success(res.message);
    toast.error(res.message);
}