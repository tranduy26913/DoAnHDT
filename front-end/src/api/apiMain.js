import { logoutSuccess } from "../redux/authSlice";
import {axiosClient,axiosInstance} from "./axiosClient";

const apiMain = {
    login: async(params)=>{
        const res=await axiosClient.post('/auth/login',params)
        return res.data;
    },

    getStory: async(params)=>{
        const res= await axiosClient.get('/novels/',{params:params});
        console.log(res);
        return res.data;
       
    },

    getAllUser: async(user, dispatch,stateSuccess)=>{
        const url='/getusers'
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
        
    }
}
export default apiMain;