import { register } from "api/apiAuth"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { modalStore } from "store/modalStore"

export default function useRegister() {
    const authInactive = modalStore(state => state.authInactive)

    const { mutate, isLoading } = useMutation((variables) => register(variables), {
        onSuccess: async (data: any, context: any) => {
            const { refreshToken, accessToken, ...user } = data.data
            toast.success("Đăng ký thành công. Vui lòng vào email để mở liên kết xác thực tài khoản", { autoClose: 3000, pauseOnHover: false, hideProgressBar: true });//hiển thị toast thông báo
            authInactive() //hành động tắt modal login
        },
        onError: async (data: any, context: any) => {
            let msg = data.response.data.details
            let _ = msg.username || msg.password || msg.active || msg.toString()
            toast.warning(_);
        }
    })

    return {mutate,isLoading}

}
