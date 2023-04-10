import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutSuccess } from 'redux/authSlice'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import { clearUserInfo, setUserInfo } from 'redux/userSlice'
import { useState } from 'react'
import LoadingData from 'components/LoadingData/LoadingData'

import { userStore } from 'store/userStore'
import { authStore } from 'store/authStore'
import { getUserInfo } from 'api/apiAuth'

const privatePath = [
    '/user/', '/payment'
]

function CheckAuthentication(props:any) {
    const user = userStore(state => state.user)
    const refreshToken = authStore(state => state.auth?.refreshToken)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        const check = () => {
            const isPrivate:boolean = privatePath.findIndex(e => location.pathname.includes(e)) >= 0 ? true : false
            if(isPrivate){
                setLoading(true)
            }
            if (refreshToken) {
                const tokenDecode:any = jwt_decode(refreshToken)
                let date = new Date();
                if (tokenDecode.exp < date.getTime() / 1000) {
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                    logoutSuccess()
                    if (isPrivate)
                        navigate('/')
                }
                if (!user) {
                    getUserInfo()
                        .then((res:any) => {
                            console.log(res);
                            setUserInfo(res.data.userInfo)
                        })
                        .finally(()=>setLoading(false))
                    // dispatch(logoutSuccess())
                    // 
                    // if (isPrivate)
                    //     navigate('/')
                }
                else{
                    setLoading(false)
                }
            }
            else {
                setLoading(false)
                dispatch(clearUserInfo())
                if (isPrivate) {
                    //toast.warning("Bạn không có quyền truy cập. Vui lòng đăng nhập lại")
                    navigate('/')
                }
            }
        }
        check()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshToken])
    return (
        <>
        {
            loading?<>
             <LoadingData />
            {/* <Typography>Đang lấy thông tin người dùng. Vui lòng đợi</Typography> */}
            </>
            :props.children
        }
        </>
    )
}

export default CheckAuthentication