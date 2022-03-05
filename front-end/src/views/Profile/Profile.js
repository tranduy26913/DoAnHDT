import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess } from '../../redux/authSlice';
import {useSelector,useDispatch} from 'react-redux'
import getData from '../../api/getData';
import Layout from '../../components/Layout';
import avt from '../../assets/img/avt.png'

function Profile() {
    const user = useSelector(state => state.auth.login?.user);
    const [userInfo, setUserInfo]=useState(null);
    const [edit, setEdit]=useState(false);
    const [image, setImage]=useState(avt);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate]=useState(null);
    const [textBtnEdit,setTextBtnEdit]=useState("Sửa")
    const dispatch = useDispatch();


    const handleEdit=()=>{
      if(edit){
        
        setTextBtnEdit("Sửa");
      }
      else{
        setTextBtnEdit("Lưu")
      }
      setEdit(pre=>!pre)
    }

    

    useEffect(()=>{
        const getUsers = async()=>{
          const res=getData(await apiMain.getUserInfo(user,dispatch,loginSuccess));
          setUserInfo(res.userInfo)
          setBirthDate(new Date(res.userInfo.birthdate))
          console.log(res)
        }
        getUsers()
    },[])

  return (
    <Layout >
      <div className="main-content">
        <div className="profile__wrap d-flex">
          <div className="col-3 profile__avt">
            
              <img src={userInfo?.image||avt} alt="" />
            <input type={"file"} name={"avatar"}/>
            <button>Save</button>
          </div>
          <div className="col-5 ">
            <div className="profile__main">
              <div className="group-info">
                <label htmlFor="">Tên hiển thị</label>
                {edit?<input value={userInfo?.tenhienthi}/>:<i>{userInfo?.tenhienthi}</i>}
              </div>
              <div className="group-info">
                <label htmlFor="">Email</label>
                {edit?<input readonly={true} value={userInfo?.email}/>:<i>{userInfo?.email}</i>}
              </div>
              <div className="group-info">
                <label htmlFor="">Ngày sinh</label>
                <input type="date" id="birthday" name="birthday" value={birthDate?.toISOString().substring(0, 10)}></input>
              </div>
              <div className="group-info">
                <label htmlFor="">Tên hiển thị</label>
                {edit?<input value={userInfo?.tenhienthi}/>:<i>{userInfo?.tenhienthi}</i>}
              </div>
            
              <button onClick={handleEdit}>{textBtnEdit}</button>
            </div>
          </div>

            <div className="col-4"></div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile