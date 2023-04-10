import Loading from '../Loading/Loading'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import apiMain from '../../api/apiMain';
import { handleLogin } from '../../handle/handleAuth';
import { clearMessageLogin, setLoading } from '../../redux/messageSlice';
import { toast } from 'react-toastify';
import Register from './Register';
import './Auth.scss'

import Login from './Login';
import ReActive from './ReActive';

function Auth(props) { //component đăng nhập và đăng ký
  const [login, setLogin] = useState(props.choose)

  const [isforgetPasswordForm, setIsforgetPasswordForm] = useState(false)
  const [isActiveForm, setIsActiveForm] = useState(false);

  useEffect(() => {
    setLogin(props.choose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChooseLogin = () => {
    setLogin(true)
  }
  const handleChooseRegister = useCallback(() => {
    setLogin(false)
  }, [])

  const onClickForgetpw = useCallback(() => {
    setIsforgetPasswordForm(true)
  }, [])

  const onClickActive = useCallback(() => {
    setIsActiveForm(true)
  }, [])

  return (

    <div className='auth-wrap'>
      {
        isforgetPasswordForm ? <ForgetPassword />
          : isActiveForm ? <ReActive /> :
            <div>
              <div className="auth-header">
                <ul>
                  <li style={{ cursor: 'pointer' }} onClick={handleChooseLogin}>Đăng nhập</li>
                  <li style={{ cursor: 'pointer' }} onClick={handleChooseRegister}>Đăng ký</li>
                </ul>
              </div>
              <div className="auth-body">
                {
                  login ? <Login onClickActive={onClickActive} handleChooseRegister={handleChooseRegister} onClickForgetpw={onClickForgetpw} />
                    :
                    <Register />
                }
              </div>
            </div>
      }

    </div>
  )
}




const ForgetPassword = props => { ///Quên mật khẩu
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onForgetPassword = async (e) => { //xử lý gọi API gửi mail quên mật khẩu
    e.preventDefault()
    setLoading(true)
    apiMain.forgetPassword({ email: email })
      .then(res => {
        toast.success("Đã gửi mật khẩu mới vào email");
      })
      .catch(err => {
        toast.error(err?.response?.data?.details?.message);
      })
      .finally(() => { setLoading(false) })

  }
  return (
    <div className="form-wrap">
      <form>
        <div className="form-group d-flex">
          <div className='d-flex label-group'>
            <label>Email</label>
          </div>
          <div className="field-wrap">
            <input
              placeholder="Email" required name="emailActive" type="text"
              onChange={onChangeEmail
              } value={email} />
          </div>
        </div>
        <button className='rounded-2' onClick={onForgetPassword}>{loading ? <Loading /> : ''} Gửi mật khẩu</button>
      </form>
    </div>
  )
}


export default Auth