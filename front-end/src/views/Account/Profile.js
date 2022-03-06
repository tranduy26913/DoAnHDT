import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess } from '../../redux/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import getData from '../../api/getData';
import Layout from '../../components/Layout';
import avt from '../../assets/img/avt.png'
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage';

function Profile() {
  const user = useSelector(state => state.auth.login?.user);
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(avt);
  const [preview, setPreview] = useState()
  const [name, setName] = useState(userInfo?.tenhienthi);
  const [birthDate, setBirthDate] = useState(null);
  const dispatch = useDispatch();

  const upload = async() => { //upload ảnh lên firebase
    if (image == null)
      return;
    const storageRef = ref(storage, `/images/${userInfo?.username}`);
    uploadBytes(storageRef, image).then((result) => { 
      
      alert("success");
      getDownloadURL(result.ref).then(async(url)=>{//lấy liên kết tới ảnh
        const data = {
          tenhienthi:name,
          image:url,
          birthdate:birthDate
        }
          await handleSubmitSaveProfile(data)  // xử lý update lại ảnh
      })         
    })  
  }

  const handleSubmitSaveProfile = async (data) => {
    try {
      const res = await apiMain.updateUserInfo(user,dispatch,loginSuccess,data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEdit = async(e) => {
    const data = {
      tenhienthi:name,
      image:preview,
      birthdate:birthDate
    }
    await handleSubmitSaveProfile(data)
  }



  useEffect(() => {
    const getUsers = async () => {
      const res = getData(await apiMain.getUserInfo(user, dispatch, loginSuccess));
      console.log(res.userInfo)
      console.log(res.userInfo?.image)
      setUserInfo(res.userInfo)
      setBirthDate(new Date(res.userInfo.birthdate))
      setName(res.userInfo?.tenhienthi)
      setPreview(res.userInfo?.image)
    }
    getUsers()
  }, [])

  ///OnChange event
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeBirthDate = (e) => {
    const data = e.target.value.split("-");
    console.log(new Date(e.target.value).toISOString().substring(0, 10))
    console.log(new Date(data[0], data[1] - 1, data[2], 1))
    console.log(new Date().toISOString())
    setBirthDate(new Date(e.target.value))
  }

  const onChangeImage = (e)=>{
    console.log(e.target.files)
    if(e.target.files.lenght!=0){
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  //style
  const labelStyle={'minWidth':'100px','display':'inline-block'}
  return (
        <div className="profile__wrap d-flex">
          <div className="col-5 profile__avt">

            <img src={preview} alt="" />
            <input type={"file"} name={"avatar"} onChange={onChangeImage} />
            <button onClick={upload}>Upload</button>
          </div>
          <div className="col-7 ">
            <div className="profile__main">
              <div className="group-info">
                <label htmlFor="" style={labelStyle}>Tên hiển thị</label>
                {<input onChange={onChangeName} value={name} />}
              </div>
              <div className="group-info">
                <label htmlFor="" style={labelStyle}>Email</label>
                {<input readOnly value={userInfo?.email}></input>}
              </div>
              <div className="group-info">
                <label htmlFor="" style={labelStyle}>Ngày sinh</label>
                <input onChange={onChangeBirthDate} type="date" id="birthday" name="birthday" value={birthDate?.toISOString().substring(0, 10)}></input>
              </div>
              <div className="d-flex">
                <button onClick={handleEdit}>Cập nhật</button>
              </div>
              
            </div>
          </div>
        </div>
  )
}

export default Profile