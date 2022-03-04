import {axiosClient,axiosInstance} from "./axiosClient";

const apiMain = {
    login: async(params)=>{
        const url='/login'
        return await axiosClient.post(url,params);
    },

    getAllUser: async(user, dispatch,stateSuccess)=>{
        const url='/getusers'
        let axi = axiosInstance(user, dispatch,stateSuccess)
        return (await axi.get(url,{ headers:{token: `Bearer ${user.accessToken}`},})).data;
    }
}
export default apiMain;