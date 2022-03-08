import { useSelector } from 'react-redux';
import { Navigate, useLocation,useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
const publicPath = []
const PrivateRoute = ({
    children,
    roles,
}) => {

    let location = useLocation();
    console.log(location)
    const user = useSelector(state => state.auth.login?.user);
    const navigate = useNavigate()
    if(user){
        const decodeToken=jwt_decode(user?.accessToken);
        const userHasRequiredRole= roles.includes(decodeToken.roleNames[0])? true : false
        if(!userHasRequiredRole){
            toast.warning("Bạn không có quyền truy cập",{autoClose:1000,pauseOnHover: false,hideProgressBar:true})
            return <Navigate to="/" state={{ from: location }} />;
        }
        return children;
    }
    else{
        toast.warning("Bạn chưa đăng nhập",{autoClose:1000,pauseOnHover: false})
        //navigate(-1);
        return <Navigate to="/" state={{ from: location }} />;
    }
    
};

export default PrivateRoute;