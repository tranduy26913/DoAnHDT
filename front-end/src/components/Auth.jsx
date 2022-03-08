import Loading from '../components/Loading'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import apiMain from '../api/apiMain';
import { handleLogin, handleRegister } from '../handle/handleAuth';
import { clearMessageLogin, setLoading } from '../redux/messageSlice';

function Auth(props) { //component đăng nhập và đăng ký
  const [login, setLogin] = useState(props.choose)
  
  const [isforgetPasswordForm, setIsforgetPasswordForm] = useState(false)
  const [isActiveForm, setIsActiveForm] = useState(false)
 

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    setLogin(props.choose);
    dispatch(setLoading(false))
  }, []);

  const handleChooseLogin = () => {
    setLogin(true)
  }
  const handleChooseRegister = useCallback(() => {
    setLogin(false)
  })

  const onClickForgetpw = useCallback(() => {
    setIsforgetPasswordForm(true)
  })

  const onClickActive = useCallback(() => {
    setIsActiveForm(true)
  })

  return (

    <div className='auth-wrap'>
      {
        isforgetPasswordForm ? <ForgetPassword />
          : isActiveForm ? <ReActive /> :
            <div>
              <div className="auth-header">
                <ul>
                  <li><a onClick={handleChooseLogin}>Đăng nhập</a></li>
                  <li><a onClick={handleChooseRegister}>Đăng ký</a></li>
                </ul>
              </div>
              <div className="auth-body">
                {
                  login ? <Login dispatch={dispatch} navigate={navigate} onClickActive={onClickActive} handleChooseRegister={handleChooseRegister} onClickForgetpw={onClickForgetpw} />
                    :
                    <Register dispatch={dispatch} navigate={navigate} />
                }
              </div>
            </div>
      }

    </div>
  )
}

const Login = props => {
  const loading = useSelector(state => state.message.loading)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const msgLogin = useSelector(state => state.message.login?.msg)

  useEffect(() => {
    if (msgLogin)
      props.dispatch(clearMessageLogin())
  }, [])

  const onLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };
    await handleLogin(user, props.dispatch, props.navigate);
  }
  return (
    <div className="form-wrap">
      <form>
        <div className="form-group d-flex">
          <div className='d-flex label-group'>
            <label >Tên đăng nhập</label>
            <a onClick={props.onClickActive}>Kích hoạt tài khoản</a>
          </div>
          <div className="field-wrap">
            <input
              placeholder="Username" required name="username" type="text"
              onChange={(e) => {
                setUsername(e.target.value)
              }} value={username} />
          </div>

        </div>
        <div className="form-group d-flex">
          <div className="label-group d-flex">
            <label>Mật khẩu</label>
            <a onClick={props.onClickForgetpw}>Quên mật khẩu</a>
          </div>
          <div className="field-wrap">
            <input placeholder="Password" required name="password" type='password' value={password}
              onChange={e => {
                setPassword(e.target.value)
              }} />
          </div>
        </div>
        <div className="d-flex">
          <label className='remember-label' htmlFor="remember">
            <span>Ghi nhớ mật khẩu</span>
            <input type="checkbox" id="remember"></input>
            <span className="checkmark"></span>
          </label>
        </div>
        <button className='rounded-2' onClick={onLogin}>{loading?<Loading />:""}Đăng nhập</button>
        <span >{msgLogin || ""}</span>
      </form>
      <span className="register-choose"><label>Bạn chưa có tài khoản. </label><a onClick={props.handleChooseRegister}>Đăng ký ngay?</a></span>
    </div>
  )
}

const ReActive = props => {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onReActive = async (e) => {
    e.preventDefault()
    const data = { email }
    apiMain.reActive(data)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => {
        console.log(err.response.data)
      })

  }
  return (
    <div className="form-wrap">
      <form>
        <div className="form-group d-flex">
          <div className='d-flex label-group'>
            <label >Email</label>
          </div>
          <div className="field-wrap">
            <input
              placeholder="Email" required name="emailActive" type="text"
              onChange={onChangeEmail
              } value={email} />
          </div>
        </div>
        <button className='rounded-2' onClick={onReActive}>Gửi đường dẫn kích hoạt</button>
      </form>
    </div>
  )
}

const ForgetPassword = props => {
  const [email, setEmail] = useState("")
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onForgetPassword = async (e) => {
    e.preventDefault()
    const res = await apiMain.forgetPassword({ email: email })
    console.log(res)
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
        <button className='rounded-2' onClick={onForgetPassword}>Gửi mật khẩu</button>
      </form>
    </div>
  )
}

const Register = props => {
  const loading = useSelector(state => state.message.loading)
  const [emailRegister, setEmailRegister] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordCfRegister, setPasswordCfRegister] = useState("");
  const msgRegister = useSelector(state => state.message.register?.msg)
  const onRegister = async (e) => {
    e.preventDefault();
    const user = {
      username: usernameRegister,
      password: passwordRegister,
      email: emailRegister
    };
    await handleRegister(user, props.dispatch, props.navigate);
  }

  return (
    <div className="form-wrap">
      <form>
        <div className="form-group d-flex">
          <label>Email</label>
          <div className="field-wrap">
            <input placeholder="example@gmail.com" required name="emailRegister" type="text" value={emailRegister}
              onChange={e => { setEmailRegister(e.target.value) }}
            />
          </div>

        </div>
        <div className="form-group d-flex">
          <label>Tên đăng nhập</label>
          <div className="field-wrap">
            <input required name="usernameRegister" type="text" value={usernameRegister}
              onChange={e => { setUsernameRegister(e.target.value) }} />
          </div>

        </div>
        <div className="form-group d-flex">
          <label>Mật khẩu</label>
          <div className="field-wrap">
            <input required={true} name={"passwordRegister"} type='password' value={passwordRegister}
              onChange={e => { setPasswordRegister(e.target.value) }}
            />
          </div>

        </div>
        <div className="form-group d-flex">
          <label>Nhập lại mật khẩu</label>
          <div className="field-wrap">
            <input required={true} name={"passwordCfRegister"} type='password' value={passwordCfRegister}
              onChange={e => { setPasswordCfRegister(e.target.value) }}
            />
          </div>
        </div>
        <span>{msgRegister}</span>
        <button onClick={onRegister}>{loading?<Loading/>:""}Đăng ký</button>

      </form>
    </div>
  )
}
export default Auth