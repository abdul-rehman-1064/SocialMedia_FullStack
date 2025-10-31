import React, { use, useRef, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../assets/userImage.png";
import axios from "axios";
import { serverURL } from "../App";
import { setProfileData, setUserData } from "../store/authSlice"; 
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const username = userData?.data?.user?.username;
  const [frontEndImage, setFrontEndImage] = useState(userData?.data?.user.profileImage || user);
  const [backEndImage, setBackEndImage] = useState(null);
  const [userName,setUserName] = useState(userData?.data?.user?.username || "");
  const [name,setName] = useState(userData?.data?.user?.name || "");
  const [bio,setBio] = useState(userData?.data?.user?.bio || "");
  const [profession,setProfession] = useState(userData?.data?.user?.profession || "");
  const [loading, setLoading] = useState(false);
  const imageInput = useRef(null);
  const dispatch = useDispatch()  

  const handleImage = (e)=>{
    const file = e.target.files[0];
    setBackEndImage(file);
    setFrontEndImage(URL.createObjectURL(file));
  }

  const handleEditProfile = async ()=>{
    setLoading(true);
    try {
      const formData = new FormData()
      formData.append("name" ,name)  
      formData.append("username" ,userName)  
      formData.append("bio" ,bio)  
      formData.append("profession" ,profession) 
      if(backEndImage){
        formData.append("profileImage",backEndImage)
      } 
      const response = await axios.post(`${serverURL}/api/user/updateProfile`,formData,{withCredentials:true})
      dispatch(setProfileData(response.data))
      dispatch(setUserData(response.data))
      setLoading(false);
      navigate(`/`);
    } catch (error) {
      console.log("Edit Profile :",error);
      
    }
  }

  return (
    <div className="w-full min-h-[100vh] bg-black flex flex-col items-center gap-[20px]">
      <div className="absolute left-6 top-7 text-white">
        <div className="flex items-center gap-5">
          <MdOutlineKeyboardBackspace
            onClick={() => navigate(`/profile/${username}`)}
            className="text-2xl cursor-pointer"
          />
          <h1 className="text-white font-semibold text-xl">Edit Profile</h1>
        </div>
      </div>

      <div className="w-[70px] h-[70px] md:h-[120px] md:w-[120px] border-2 border-black rounded-full mt-28 cursor-pointer overflow-hidden" onClick={()=>imageInput.current.click()} onChange={handleImage}>
        <input type="file" className="hidden" accept="image/*" ref={imageInput} />
        <img
          src={frontEndImage}
          alt=""
          className="w-full object-cover"
        />
      </div>
      <div className="text-blue-700 cursor-pointer " onClick={()=>imageInput.current.click()} onChange={handleImage}>Change Your Profile Image</div>
      <input type="text" name="" id="" placeholder="Enter Your Username " value={userName} onChange={(e)=>setUserName(e.target.value)} className="w-[90%] max-w-[500px] h-[50px] text-white bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none "/>
      <input type="text" name="" id="" placeholder="Enter Your Name " value={name} onChange={(e)=>setName(e.target.value)} className="w-[90%] max-w-[500px] h-[50px] text-white bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none "/>
      <input type="text" name="" id="" placeholder="Enter Your details " value={bio} onChange={(e)=>setBio(e.target.value)} className="w-[90%] max-w-[500px] h-[50px] text-white bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none "/>
      <input type="text" name="" id="" placeholder="Enter Your Profession " value={profession} onChange={(e)=>setProfession(e.target.value)} className="w-[90%] max-w-[500px] h-[50px] text-white bg-[#0a1010] border-2 border-gray-700 rounded-2xl px-[20px] outline-none "/>

      <button className="w-[90%] max-w-[500px] h-[50px] cursor-pointer bg-blue-600 rounded-2xl text-white font-semibold" onClick={handleEditProfile}>
        {loading ? <ClipLoader size={28} color="white"/> : "Save Changes"}
      </button>
    </div>
  );
}

export default EditProfile;
