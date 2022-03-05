import React, { useCallback } from 'react'
import { useEffect,  useRef } from 'react'
import {  Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/img/logo.png';
import Auth from './Auth';
import Modal, { ModalContent } from './modal';
import { authLoginActive,authRegisterActive, authInactive } from '../redux/modalSlice';
import jwt_decode from 'jwt-decode';
import getData from '../api/getData';
import apiMain from '../api/apiMain';
import { loginSuccess } from '../redux/authSlice';




export default function Header() {
    const headerRef=useRef(null)
    const expandRef=useRef(null)
    const profileDropdownRef=useRef(null)
    const user = useSelector(state => state.auth.login?.user);
    const modalAuth = useSelector(state => state.modal.auth.active);
    const modalLogin = useSelector(state => state.modal.auth.login);

    

    const dispatch = useDispatch();

    const handleExpand=()=>{
        expandRef.current.classList.toggle('active')    
    }

    const handleDropdownProfile=()=>{
        profileDropdownRef?.current.classList.toggle('active')    
    }

    const closeModalAuth=useCallback(()=>{
        dispatch(authInactive());
    });

    const handleAuthLogin = ()=>{
        dispatch(authLoginActive());
    }

    const handleAuthRegister = ()=>{
        dispatch(authRegisterActive());
    }

    useEffect(()=>{
        const checkAuth=async()=>{
            let date=new Date();
            const decodeToken=jwt_decode(user?.accessToken);
            if(decodeToken.exp < date.getTime()/1000){
                const newAccessToken = getData(await apiMain.refreshToken(user));
                console.log(newAccessToken.accessToken)
                const newUser = {
                    ...user,
                    accessToken:newAccessToken.accessToken
                }
                dispatch(loginSuccess(newUser))
            }
        }
        checkAuth()
    },[])

    
    
    return (
        <>
            <nav ref={headerRef} className="header">
                <div className="header__wrap">
                    <div className='collapse'>
                        <button onClick={handleExpand} className='navbar-nav__collapse'><i className="fa-solid fa-bars"></i></button>
                        <div className="navbar__items__expand" ref={expandRef}>
                    <ul className='navbar-nav__list__expand'>
                        <Link to='/'>
                            <li className='text-bold'>
                                    Thể loại
                            </li>
                        </Link>
                        <Link to='/truyen'>
                            <li className='text-bold'>Bảng xếp hạng</li>
                        </Link>
                        <Link to='/'>
                                <li>Đăng truyện</li>
                            </Link>
                            {
                                user ? <Link to='/profile'>
                                    <i style={{ marginRight: 4 + 'px' }} className="fa-solid fa-user"></i>
                                    {user.name || user.username}
                                </Link> :
                                    <>
                                        <Link to='/' onClick={handleAuthLogin}><li>Đăng nhập</li></Link>
                                        <Link to='/' onClick={handleAuthRegister}><li>Đăng ký</li></Link>
                                    </>
                            }
                    </ul>
                </div>
                    </div>
                    
                    <div className="logo">
                        <Link className="" to='/'><img src={logo} alt="" /></Link>
                    </div>
                    <div className="navbar-nav">
                        
                        <ul className='navbar-nav__list'>
                            <Link to='/'>
                                <li className='text-bold'>
                                    Thể loại
                                </li>
                            </Link>
                            <Link to='/truyen'>
                                <li className='text-bold'>Bảng xếp hạng</li>
                            </Link>
                        </ul>
                        <div className='navbar-nav__list__search'>
                            <div className='form-group'>
                                <input placeholder='Tìm kiếm'></input>
                                <button><i className="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                        </div>
                        <ul className='navbar-nav__list navbar-nav__list--right'>
                            <Link to='/'>
                                <li><i style={{ marginRight: 4 + 'px' }} className="fa-regular fa-circle-up"></i> Đăng truyện</li>
                            </Link>
                            {
                                user ? <div className='navbar-nav__profile'>
                                    <div onClick={handleDropdownProfile} className="navbar-nav__profile__name"> <i style={{ marginRight: 4 + 'px' }} className="fa-solid fa-user"></i>
                                    {user.name||user.username}
                                        </div>

                                        <div ref={profileDropdownRef} className="navbar-nav__profile__menu">
                                            <ul>
                                                <li><Link to="/profile">Hồ sơ</Link></li>
                                                <li>Cài đặt</li>
                                                <li>Thoát</li>
                                                <li></li>
                                            </ul>
                                        </div>
                                   


                                    </div>
                                 :
                                    <>
                                        <Link to='/' onClick={handleAuthLogin}><li>Đăng nhập</li></Link>
                                        <Link to='/' onClick={handleAuthRegister}><li>Đăng ký</li></Link>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
                
            </nav>

            {modalAuth&&<Modal active={modalAuth}>
                <ModalContent onClose={closeModalAuth}>
                    <Auth choose={modalLogin}/>
                </ModalContent>
            </Modal>}
        </>
    )
}
