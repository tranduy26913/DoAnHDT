import { Story } from "models/Story";
import { axiosClient, axiosClientWithToken } from "./axiosClient";
import getData from "./getData";

export const login =async (params:any) => {
    const res = await axiosClient.post('/auth/login', params)
    return res.data;
}
export const register= async (params:any) => {
    const res = await axiosClient.post('/auth/register', params)
    return res.data;
}
export const forgetPassword= async (params:any) => {
    const res = await axiosClient.post<never>('/auth/forgetpassword', params)
    return getData(res);
}
export const reActive= async (params:any) => {
    const res = await axiosClient.post<never>('/auth/reactive', params)
    return getData(res);
}

export const getUserInfo=async () => {
    return (await axiosClientWithToken.get('/user/info')).data;
}