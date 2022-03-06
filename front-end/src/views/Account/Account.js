import React from 'react'

import {  Link, Outlet, useLocation} from 'react-router-dom';
import Layout from '../../components/Layout';

function Account() {
  const menu = [
    {
      path:"profile",
      display:"Hồ sơ",
      icon:""
    },
    {
      path:"change-password",
      display:"Đổi mật khẩu",
      icon:""
    },
    {
      path:"tu-truyen",
      display:"Tủ truyện",
      icon:""
    },

  ]

  const { pathname } = useLocation();
  console.log(pathname.split('/'))
  const active = menu.findIndex(e => e.path === pathname.split('/')[2]);
  return (
    <Layout >
      <div className="main-content">
        <div className="d-flex">
          <div className="col-3">
            <ul className="list-group">
                {
                  menu.map((item,index)=>{
                    return <li key={index} className={`list-group__item ${index===active?'active':''}`} ><Link to={item.path}>{item.display}</Link></li>
                  })
                }
            </ul>
            
          </div>
          <div className="col-9 ">
            <Outlet/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Account