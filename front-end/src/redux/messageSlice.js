
import { createSlice } from "@reduxjs/toolkit"
export const messageSlice = createSlice({
    name:"message",
    initialState:{
        login:{
            msg:""
        },
        auth:{
            msg:""
        }
    },
    reducers:{
        setMessageAuth:(state,action)=>{
            state.auth.msg = action.payload
        },
        clearMessageAuth:(state)=>{
            state.auth.msg=""
        }
    }
})


export const {
    setMessageAuth
}=messageSlice.actions

export default messageSlice.reducer