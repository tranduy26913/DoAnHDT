import {loginStart,loginSuccess,loginFalse} from "../redux/authSlice"
import {authInactive} from '../redux/modalSlice'
import apiMain from '../api/apiMain'
import {setMessageLogin,setMessageRegister} from '../redux/messageSlice'
import {axiosClient} from '../api/axiosClient'
import getData from '../api/getData'

export const handleLogin =async(user, dispatch,navigate)=>{
    dispatch(loginStart());
    try {
      const response = await apiMain.login(user) //gọi api login
      if(response.status==200){
        dispatch(loginSuccess(getData(response))); //lấy thông tin user
      dispatch(authInactive()) //hành động tắt modal login
      }
    } catch (error) {
      console.log(error.response.data)
      dispatch(loginFalse());
      dispatch(setMessageLogin(error.response.data.message))
    }
}

export const handleRegister =async(params, dispatch,navigate)=>{
  try {
    const res = await apiMain.register(params) //gọi api login
    console.log(res.status)
    if(res.status==200){
      console.log(typeof res.data.email)
      dispatch(setMessageRegister("Đăng ký thành công")); //lấy thông tin user
      dispatch(authInactive()) //hành động tắt modal login
    }
  } catch (error) {
    console.log(error)
    dispatch(loginFalse());
    //dispatch(setMessageRegister(error.response?.data?.message))
  }
}

