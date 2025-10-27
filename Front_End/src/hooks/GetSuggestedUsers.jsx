import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverURL} from '../App'
import { useDispatch } from 'react-redux'
import { setSuggestedUsers } from '../store/authSlice'
import { useSelector } from 'react-redux'


function GetSuggestedUsers() {
    const dispatch = useDispatch()
    const {userData} = useSelector((state)=>state.auth)
 useEffect(()=>{
    const fetchCurrentUser = async()=>{
        try {
            const user = await axios.get(`${serverURL}/api/user/suggested`,{withCredentials:true})
            console.log("Suggested Users Data : ",user.data);
            dispatch(setSuggestedUsers(user.data))
        } catch (error) {
            console.log("Get User Data : ",error);
            
        }
    }
    fetchCurrentUser()
 },[userData])
}

export default GetSuggestedUsers