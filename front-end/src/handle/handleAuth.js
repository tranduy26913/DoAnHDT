import {loginSuccess, logoutSuccess} from "../redux/authSlice"
import {authInactive} from '../redux/modalSlice'
import apiMain from '../api/apiMain'
import {setLoading, setMessageLogin,setMessageRegister} from '../redux/messageSlice'
import getData from '../api/getData'
import { toast } from "react-toastify";

import { useDispatch } from "react-redux"
import { useNavigate} from 'react-router-dom'
import { clearUserInfo, setUserInfo } from "redux/userSlice"

const publicPath = [
  '/ddd/','/truyen/'
]


export const handleRegister =async(params, dispatch)=>{
  try {
    dispatch(setLoading(true))
    const res = await apiMain.register(params) //gọi api login
    if(res.status===200){
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
  finally{
    dispatch(setLoading(false))
  }
}

// export const handleLogout = (navigate,location)=>{
//   const isPublic = publicPath.findIndex(e=>location.pathname.includes(e))>0?true:false
//   dispatch(logoutSuccess())
//   dispatch(clearUserInfo())
//   toast.success("Đăng xuất thành công",{autoClose: 800,pauseOnHover: false,hideProgressBar: true});//hiển thị toast thông báo
 
//   if(!isPublic)
//     navigate('/')
// }

export const HandleLogoutWhenError = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dispatch(logoutSuccess())
  navigate('/')
}


