import React from 'react'
import { GoHomeFill } from "react-icons/go";
import {FiSearch} from "react-icons/fi"
import {IoAddCircleOutline} from "react-icons/io5"
import {BsChatDots} from "react-icons/bs"
import {RxVideo} from "react-icons/rx"
import user from "../assets/userImage.png";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


function BottomNav() {
    const naviagte = useNavigate();
    const { userData } = useSelector((state) => state.auth);
    console.log("userData at nav",userData);
    
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-white lg:bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
        <div className='' onClick={()=>naviagte("/")}><GoHomeFill className='text-black lg:text-white w-[25px] h-[25px]'/></div>
        <div><FiSearch className='text-black lg:text-white w-[25px] h-[25px]'/></div>
        <div><IoAddCircleOutline className='text-black lg:text-white w-[30px] h-[30px]'/></div>
        <div><RxVideo className='text-black lg:text-white w-[25px] h-[25px]'/></div>
        <div className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={()=>naviagte(`/profile/${userData?.data.user.username}`)}>
                  <img
                    src={userData?.data?.user?.profileImage || user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>

    </div>
  )
}

export default BottomNav