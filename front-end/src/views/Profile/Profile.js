import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess } from '../../redux/authSlice';
import {useSelector,useDispatch} from 'react-redux'
import getData from '../../api/getData';

function Profile() {
    const user = useSelector(state => state.auth.login?.user);
    const [listUser, setListUser]=useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        const getUsers = async()=>{
          const res=getData(await apiMain.getUserInfo(user,dispatch,loginSuccess));
          setListUser(res.getUserInfo)
        
          console.log(res)
        }
        getUsers()
    },[])

  return (
    <div style={{"marginTop":"100px"}}>
      

    </div>
  )
}

export default Profile