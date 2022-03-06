import {loginStart,loginSuccess,loginFalse} from "../redux/authSlice"
import {authInactive} from '../redux/modalSlice'
import apiMain from '../api/apiMain'

export const handleLogin =async(user, dispatch,navigate)=>{
    dispatch(loginStart());
    try {
      const response = await apiMain.login(user); //gọi api login
      console.log(response.data)
      dispatch(loginSuccess(response.data)); //lấy thông tin user
      dispatch(authInactive()) //hành động tắt modal login
    } catch (error) {
      dispatch(loginFalse());
    }
}

