
import { createSlice } from "@reduxjs/toolkit"
export const messageSlice = createSlice({
    name:"message",
    initialState:{
        login:{
            msg:""
        },
        register:{
            msg:""
        },
        auth:{
            msg:""
        }
    },
    reducers:{
        setMessageLogin:(state,action)=>{
            state.login.msg = action.payload
        },
        clearMessageLogin:(state)=>{
            state.login.msg=""
        },
        setMessageAuth:(state,action)=>{
            state.auth.msg = action.payload
        },
        clearMessageAuth:(state)=>{
            state.auth.msg=""
        },
        setMessageRegister:(state,action)=>{
            state.register.msg = action.payload
        },
        clearMessageRegister:(state)=>{
            state.register.msg=""
        }
    }
})


export const {
    setMessageAuth,
    setMessageLogin,
    clearMessageAuth,
    clearMessageLogin,
    setMessageRegister,
    clearMessageRegister
}=messageSlice.actions

export default messageSlice.reducer