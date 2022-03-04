import {axiosClient,axiosInstance} from "./axiosClient";

const apiMain = {
    login: async(params)=>{
        const res=await axiosClient.post('/auth/login',params)
        return res.data;
    },

    getAllUser: async(user, dispatch,stateSuccess)=>{
        const url='/getusers'
        let axi = axiosInstance(user, dispatch,stateSuccess)
        return (await axi.get(url,{ headers:{Authorization: `Bearer ${user.accessToken}`},})).data;
    }
}
export default apiMain;