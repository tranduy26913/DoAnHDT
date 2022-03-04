import {loginStart,loginSuccess,loginFalse} from "../redux/authSlice"
import {authInactive} from '../redux/modalSlice'
import apiMain from '../api/apiMain'
export const handleLogin =async(user, dispatch,navigate)=>{

    dispatch(loginStart());
    try {
      const response = await apiMain.login(user);
      dispatch(loginSuccess(response.data));
      dispatch(authInactive())
    } catch (error) {
      console.log(error)
      dispatch(loginFalse());
    }
}
