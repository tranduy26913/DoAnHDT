import { logoutSuccess } from "../redux/authSlice";
import ChangePassword from "../views/Account/ChangePassword";
import {axiosClient,axiosInstance} from "./axiosClient";

const apiMain = {

    ///authentication
    login: async(params)=>{
        const res=await axiosClient.post('/auth/login',params)
        return res.data;
    },
    register: async(params)=>{
        const res=await axiosClient.post('/auth/register',params)
        return res.data;
    },
    forgetPassword:async(params)=>{
        const res=await axiosClient.post('/auth/forgetpassword',params)
        return res.data;
    },
    reActive: async(params)=>{
        const res=await axiosClient.post('/auth/reactive',params)
        return res.data;
    },
    ///get data

    getStorys: async(params)=>{
        const res= await axiosClient.get(`/novels/`,{params:params});
        return res.data;
       
    },
    getStory: async(params)=>{
        const res= await axiosClient.get(`/novels/novel/${params.url}`);
        return res.data;
       
    },
    getChapters : async(url,params)=>{
        const res= await axiosClient.get(`/novels/novel/${url}/chuong`,{params:params});
        return res.data;
       
    },
    getNameChapters : async(url,params)=>{
        const res= await axiosClient.get(`/novels/novel/${url}/mucluc`,{params:params});
        return res.data;   
    },
    getChapterByNumber : async(tentruyen,chapnum)=>{
        const res= await axiosClient.get(`/novels/novel/${tentruyen}/chuong/${chapnum}`);
        console.log(res.data)
        return res.data;
       
    },

    ///user

    getAllUser: async(user, dispatch,stateSuccess)=>{
        const url='admin/users'
        let axi = axiosInstance(user, dispatch,stateSuccess)
        return (await axi.get(url,{ headers:{Authorization: `Bearer ${user.accessToken}`},})).data;
    },

    refreshToken : async(user)=>{
        const params = {refreshToken:user.refreshToken}
        const res= await axiosClient.post('/auth/refreshtoken',params,{ headers:{Authorization:`Bearer ${user.accessToken}`},})
        return res.data
    },

    getUserInfo : async(user,dispatch,stateSuccess)=>{
        try {
            const axi = await axiosInstance(user,dispatch,stateSuccess)
            return (await axi.get('/user/info',{headers:{Authorization:`Bearer ${user.accessToken}`}})).data;
        } catch (error) {
            console.log(error.response.data?.details[0])
            dispatch(logoutSuccess());
        }
        
    },
    updateUserInfo : async(user,dispatch,stateSuccess,params)=>{
        try {
            const axi = await axiosInstance(user,dispatch,stateSuccess)
            return (await axi.put('/user/info',params,{headers:{Authorization:`Bearer ${user.accessToken}`}})).data;
        } catch (error) {
            console.log(error.response.data?.details[0])
            dispatch(logoutSuccess());
        }
    },

    ChangePassword: async(user,dispatch,stateSuccess,params)=>{
        try {
            const axi = await axiosInstance(user,dispatch,stateSuccess)
            return (await axi.put('/user/info/password',params,{headers:{Authorization:`Bearer ${user.accessToken}`}})).data;
        } catch (error) {
            console.log(error)
            dispatch(logoutSuccess());
        }
    },
    activeAccount:async(params)=>{
        const res= await axiosClient.get(`/auth/active/`,{params:params});
        return res.data;   
    }
}
export default apiMain;