import React, { useCallback } from 'react'
import { useEffect, useState, useRef } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/img/logo.png';
import Auth from './Auth';
import Modal, { ModalContent } from './modal';
import { authLoginActive,authRegisterActive, authInactive } from '../redux/modalSlice';


export default function Header() {
    const headerRef=useRef(null)
    const expandRef=useRef(null)
    const user = useSelector(state => state.auth.login?.user);
    const modalAuth = useSelector(state => state.modal.auth.active);
    const modalLogin = useSelector(state => state.modal.auth.login);

    

    const dispatch = useDispatch();

    const handleExpand=()=>{
        expandRef.current.classList.toggle('active')    
    }

    const closeModalAuth=useCallback(()=>{
        dispatch(authInactive());
        console.log(modalAuth)
    });

    const handleAuthLogin = ()=>{
        dispatch(authLoginActive());
        console.log(modalAuth)
    }

    const handleAuthRegister = ()=>{
        dispatch(authRegisterActive());
        console.log(modalAuth)
    }

    useEffect(()=>{
        
    },[modalAuth])
    
    
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
                                    {user.name}
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
                                user ? <Link to='/profile'>
                                    <i style={{ marginRight: 4 + 'px' }} className="fa-solid fa-user"></i>
                                    {user.name}
                                </Link> :
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
