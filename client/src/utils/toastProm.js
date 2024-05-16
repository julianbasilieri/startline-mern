import toast from "react-hot-toast";

export async function toastProm(prom) {
    try {
        toast.remove()
        toast.loading('Verificando');
        const res = await prom;
        toast.remove()

        if (res.data.success) {
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message);
        }

        return res;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error;
    }
}