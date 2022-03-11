
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiMain from '../../api/apiMain'
import { loginSuccess } from '../../redux/authSlice'
import Reading from '../../components/Reading'
const nav = [
  {
    path: 'reading',
    display: 'Đang đọc'
  },
  {
    path: 'save',
    display: 'Đánh dấu'
  },
]
function TuTruyen() {
  const [tab,setTab] = useState("reading")
  const active = nav.findIndex(e => e.path === tab)
  const [readings,setReadings]=useState([])
  const user = useSelector(state=>state.auth.login.user)
  const dispatch = useDispatch()
  useEffect(async()=>{
    if(user){
      apiMain.getReadings(user,dispatch,loginSuccess)
        .then(res=>{
          console.log(res)
          setReadings(res)
        })
        .catch(err=>{
          console.log(err)
        })
    }
  },[])

  return (
    <>
      <ul className='navigate'>
        {
          nav.map((item, index) => {
            return <>
              <a className={`navigate__tab fs-16 bold ${active === index ? 'tab_active' : ''}`}
                key={index}
                name={item.path}
                onClick={(e)=>{setTab(e.target.name)}}
              >{item.display}</a></>
          })
        }
      </ul>

      <div>
      {
        readings.map((item,i)=>{
          return <><Reading key={i} data={{
              tentruyen:item.dautruyenId.tentruyen,
              hinhanh:item.dautruyenId.hinhanh,
              dadoc:item.chapNumber,
              total:item.dautruyenId?.sochap,
              url:item.dautruyenId.url
              }}/>
              <hr/></>
        })
      }
      </div>

    </>
  )
}

export default TuTruyen