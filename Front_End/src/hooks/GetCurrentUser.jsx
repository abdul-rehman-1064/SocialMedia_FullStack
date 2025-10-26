import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {serverURL} from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../store/authSlice'


function GetCurrentUser() {
    const dispatch = useDispatch()
 useEffect(()=>{
    const fetchCurrentUser = async()=>{
        try {
            const user = await axios.get(`${serverURL}/api/user/current`,{withCredentials:true})
            dispatch(setUserData(user.data))
        } catch (error) {
            console.log("Get User Data : ",error);
            
        }
    }
    fetchCurrentUser()
 },[])
}

export default GetCurrentUser