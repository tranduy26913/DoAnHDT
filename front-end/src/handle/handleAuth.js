import {loginStart,loginSuccess,loginFalse, logoutSuccess} from "../redux/authSlice"
import {authInactive} from '../redux/modalSlice'
import apiMain from '../api/apiMain'
import {setLoading, setMessageLogin,setMessageRegister} from '../redux/messageSlice'
import {axiosClient} from '../api/axiosClient'
import getData from '../api/getData'
import { toast } from "react-toastify";
import lang from '../lang/lang'

const publicPath = [
  '/ddd/','/truyen/'
]

export const handleLogin =async(user, dispatch,navigate)=>{
    dispatch(setLoading(true));
    apiMain.login(user)
      .then(res=>{
        dispatch(loginSuccess(getData(res))); //lấy thông tin user
        dispatch(setLoading(false));
        toast.success("Đăng nhập thành công",{autoClose: 1200,pauseOnHover: false,hideProgressBar:true});//hiển thị toast thông báo
        dispatch(authInactive()) //hành động tắt modal login
        }
      ) //gọi api login
      .catch (error =>{
      dispatch(loginFalse());
      const msg=error.response?.data?.details
      let _ = msg.username||msg.password||msg.active||msg.toString()
      dispatch(setMessageLogin(_))
    })
}

export const handleRegister =async(params, dispatch,navigate)=>{
  try {
    const res = await apiMain.register(params) //gọi api login
    if(res.status==200){
      dispatch(setMessageRegister("")); 
      toast.success("Đăng ký thành công. Vui lòng vào email để mở liên kết xác thực tài khoản",{autoClose: 3000,pauseOnHover: false});//hiển thị toast thông báo
      dispatch(authInactive()) //hành động tắt modal register
    }
  } catch (error) {
    //console.log(error)
    const msg=error.response?.data?.details
    let _ = msg.email||msg.username||msg.password
    console.log(error.response.data)
    dispatch(setMessageRegister(_));
  }
}

export const handleLogout = (dispatch,navigate,location)=>{
  const s=""
  const isPublic = publicPath.findIndex(e=>location.pathname.includes(e))>0?true:false
  dispatch(logoutSuccess())
  toast.success("Đăng xuất thành công",{autoClose: 800,pauseOnHover: false,hideProgressBar: true});//hiển thị toast thông báo
  console.log(isPublic)
  if(!isPublic)
    navigate('/')
}

