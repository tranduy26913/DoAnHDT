import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import apiMain from '../../api/apiMain'
import { loginSuccess } from '../../redux/authSlice'

function Users(props) {
  const user = useSelector(state => state.auth.login?.user)
  const [listUser, setListUser] = useState([])


  useEffect(() => {
    const loadAllUser = async () => {
      const res = apiMain.getAllUser(user, props.dispatch, loginSuccess)
        .then(response => { 
          setListUser(response)
         })
    }
    loadAllUser()
  }, [])
  return (
    <>
      <h1>All Users</h1>

      <table style={{"width":"90%"}}>
        <tr>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Trạng thái</th>
          <th>Quyền hạn</th>
        </tr>
        {
          listUser.map((item, index) => {
            return (
              <tr>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.active?"Đã kích hoạt":"Chưa kích hoạt"}</td>
                <td>{item.roles[0].name||"Lỗi"}</td>
              </tr>
            )
          })
        }
      </table>

    </>

  )
}

export default Users