import React from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate();
    const {userData} = useSelector((state) => state.auth);
    const username = userData?.data?.user?.username;
  return (
    <div className='w-full min-h-[100vh] bg-black flex flex-col items-center gap-[20px]'>
        <div className="text-white cursor-pointer" onClick={()=>navigate(`/profile/${username}`) }>
                  <MdOutlineKeyboardBackspace  className="text-2xl" />
                </div>
    </div>
  )
}

export default EditProfile