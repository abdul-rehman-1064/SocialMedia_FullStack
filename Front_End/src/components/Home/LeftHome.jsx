import React from "react";
import logo from "../../assets/social2.png";
import { FaRegHeart } from "react-icons/fa6";
import user from "../../assets/userImage.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {serverURL} from "../../App"
import { setUserData } from "../../store/authSlice";

function LeftHome() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = async()=>{
    try {
        const response = axios.get(`${serverURL}/api/auth/signout`,{withCredentials:true});
        console.log("logout response : ",response);
        dispatch(setUserData(null))
    } catch (error) {
        console.log("logout Error : ",error);
        
    }
  }

  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-black border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img src={logo} alt="" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-white w-[25px] h-[25px]" />
        </div>
      </div>

      <div className="flex items-center w-full justify-between gap-[10px]">
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={userData?.profileImage || user}
            alt=""
            className="w-full object-cover"
          />
        </div>
        <div className="flex justify-between gap-[5px] flex-1 items-center">
          <div className="text-white text-[20px] ml-6 font-semibold">
            {userData?.data?.user.username}
          <div className="text-gray-400 font-medium text-[14px]">
            {userData?.data?.user.name}
          </div>
          </div>
          <div className=" mr-6 text-blue-400 cursor-pointer" onClick={logout}>Logout</div>
        </div>
      </div>
    </div>
  );
}

export default LeftHome;
