import React from 'react'
import user from "../assets/userImage.png";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function UsersCard({client}) {
  const navigate  = useNavigate();
    const { userData } = useSelector((state) => state.auth);
  return (
    <div className='w-full h-[80px] flex items-center justify-between '>
        <div className="w-[45px] h-[45px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={()=>navigate(`/profile/${client?.username}`)}>
                  <img
                    src={client?.profileImage || user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex justify-between gap-[5px] flex-1 items-center cursor-pointer">
                  <div className="text-white text-[20px] ml-6 font-semibold" onClick={()=>navigate(`/profile/${client?.username}`)}>
                    {client?.username}
                  <div className="text-gray-400 font-medium text-[14px]">
                    {client?.name}
                  </div>
                  </div>
                    <button className=" mr-6 cursor-pointer px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl">Follow</button>
                </div>
    </div>
  )
}

export default UsersCard