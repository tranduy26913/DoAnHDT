import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { handleLogin } from '../handle/handleAuth';

function Auth(props) {
  const [login, setLogin] = useState(props.choose)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordCfRegister, setPasswordCfRegister] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };
    await handleLogin(user,dispatch,navigate);
  }

  useEffect(() => {
    setLogin(props.choose);
  }, []);

  const handleChooseLogin = () => {
    setLogin(true)
  }
  const handleChooseRegister = () => {
    setLogin(false)
  }

  return (
    <div className='auth-wrap'>
      <div className="auth-header">
        <ul>
          <li><a onClick={handleChooseLogin}>Đăng nhập</a></li>
          <li><a onClick={handleChooseRegister}>Đăng ký</a></li>
        </ul>

      </div>
      <div className="auth-body">
        {
          login ? <div className="form-wrap">
            <form>
              <div className="form-group d-flex">
                <div className='d-flex label-group'>
                  <label >Tên đăng nhập</label>
                  <a>Kích hoạt tài khoản</a>
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
                  <a>Quên mật khẩu</a>
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
              <button className='rounded-2' onClick={onLogin}>Đăng nhập</button>
            </form>
            <span className="register-choose"><label>Bạn chưa có tài khoản. </label><a onClick={props.onClickRegister}>Đăng ký ngay?</a></span>
          </div>
            :
            <div className="form-wrap">
              <form>
                <div className="form-group d-flex">
                  <label>Email</label>
                  <div className="field-wrap">
                    <input placeholder="Email" required name="emailRegister" type="text" value={emailRegister}
                      onChange={e=>{setEmailRegister(e.target.value)}} 
                    />
                  </div>
                  
                </div>
                <div className="form-group d-flex">
                  <label>Tên đăng nhập</label>
                  <div className="field-wrap">
                    <input placeholder="Email" required name="usernameRegister" type="text" value={usernameRegister} 
                      onChange={e=>{setUsernameRegister(e.target.value)}}/>
                  </div>
                  
                </div>
                <div className="form-group d-flex">
                  <label>Mật khẩu</label>
                  <div className="field-wrap">
                    <input placeholder={"Password"} required={true} name={"passwordRegister"} type='password' value={passwordRegister}
                      onChange={e=>{setPasswordRegister(e.target.value)}}
                    />
                  </div>
                  
                </div>
                <div className="form-group d-flex">
                  <label>Nhập lại mật khẩu</label>
                  <div className="field-wrap">
                    <input placeholder={"Password"} required={true} name={"passwordCfRegister"} type='password' value={passwordCfRegister}
                      onChange={e=>{setPasswordCfRegister(e.target.value)}}
                    />
                  </div>
                </div>

                <button>Đăng ký</button>
              </form>
            </div>
        }
      </div>
    </div>
  )
}

export default Auth