import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import apiMain from '../../api/apiMain';
import { loginSuccess } from '../../redux/authSlice';
import {useSelector,useDispatch} from 'react-redux'

function Profile() {
    const user = useSelector(state => state.auth.login?.user);
    const [listUser, setListUser]=useState([]);
    const dispatch = useDispatch();

    useEffect(()=>{
        const getUsers = async()=>{
          const res=await apiMain.getAllUser(user,dispatch,loginSuccess);
          setListUser(res)
        
          console.log(listUser)
        }
        getUsers()
    },[])

  return (
    <div style={{"marginTop":"100px"}}>
      {listUser?.map(item=><h1 key={item.id}>{item.username}</h1>
      )}

    </div>
  )
}

export default Profile