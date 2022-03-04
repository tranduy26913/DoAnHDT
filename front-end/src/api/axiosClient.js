
import axios from 'axios';
import queryString from 'query-string';
import jwt_decode from 'jwt-decode';

export const axiosClient = axios.create({
    //baseURL: "http://localhost:5000/api",
    baseURL:"https://novelbe.herokuapp.com/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials:true,
    paramsSerializer: (params) => queryString.stringify(params)
});



const refreshToken = async(user)=>{
    const res= await axiosClient.get(`/auth/refresh?refreshToken=${user.refreshToken}`)
    return res.data
}

export const axiosInstance = (user, dispatch,stateSuccess) => {
    const newInstance = axios.create({
        //baseURL: "http://localhost:5000/api",
        baseURL:"https://novelbe.herokuapp.com/api",
        headers: {
            "Content-Type": "application/json"
        },
        paramsSerializer: (params) => queryString.stringify(params)
    });
    newInstance.interceptors.request.use(
        async (config) => {
            let date=new Date();
            const decodeToken=jwt_decode(user?.accessToken);
            if(decodeToken.exp < date.getTime()/1000){
                const newAccessToken = await refreshToken(user);
                console.log(newAccessToken.accessToken)
                const newUser = {
                    ...user,
                    accessToken:newAccessToken.accessToken
                }
                dispatch(stateSuccess(newUser))
                config.headers['Authorization'] = `Bearer ${newAccessToken.accessToken}`;
            }
            return config;
        },
        err =>{
            return Promise.reject(err)
        }
    );
    return newInstance;

}
