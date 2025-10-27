import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userData : null ,
    suggestedUsers:null,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers :{
        setUserData : (state , action)=>{
            state.userData = action.payload;
        },
        setSuggestedUsers : (state , action)=>{
            state.suggestedUsers = action.payload;
        },
    }
})

export const {setUserData , setSuggestedUsers} = authSlice.actions;

export default authSlice.reducer;