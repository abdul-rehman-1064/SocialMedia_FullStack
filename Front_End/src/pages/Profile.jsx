import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../store/authSlice.js";
import { useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { setUserData } from "../store/authSlice.js";
import user from "../assets/userImage.png";
import BottomNav from "../components/BottomNav.jsx";

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData , userData} = useSelector((state) => state.auth);

  console.log("Profiledata at profile", profileData);
  console.log("Userdata at profile", userData);

  const handleProfile = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/api/user/getProfile/${username}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(response.data));
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const response = axios.get(`${serverURL}/api/auth/signout`, {
        withCredentials: true,
      });
      console.log("logout response : ", response);
      dispatch(setUserData(null));
    } catch (error) {
      console.log("logout Error : ", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [username, dispatch]);
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="text-white w-full h-[80px] flex items-center justify-between  px-[30px] text-[20px] font-semibold">
        <div className="cursor-pointer" onClick={()=>navigate("/") }>
          <MdOutlineKeyboardBackspace  className="text-2xl" />
        </div>
        <div className="font-semibold text-[28px]">{username}</div>
        <div
          className="font-semibold text-[20px] text-blue-500 cursor-pointer"
          onClick={logout}
        >
          Logout
        </div>
      </div>
      <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[90px] h-[90px] md:h-[140px] md:w-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || user}
            alt=""
            className="w-full object-cover"
          />
        </div>

        <div>
          <div className="text-white text-[22px] font-semibold">
            {profileData?.name}
          </div>
          <div className="text-[#ffffffe8] text-[17px]">
            {profileData?.profession || "New User"}
          </div>
          <div className="text-[#ffffffe8] text-[17px]">
            {profileData?.bio || "Bio"}
          </div>
        </div>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
        <div className=" flex flex-col items-center">
          <div className="text-[22px] md:text-[25px] font-semibold">
            {profileData?.post.length}
          </div>
          <div className="text-[18px]  text-[#ffffffc7]">Posts</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-center gap-[10px]">
            <div>
              {/* {profileData?.followers?.slice(0, 3).map((follower, index) => ( */}
                <div
                  className="w-[30px] h-[30px] border-2 text-white border-black rounded-full cursor-pointer overflow-hidden inline-block mr-[-15px]"
                >
                  <img
                    src={ user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div
                  className="w-[30px] h-[30px] border-2 text-white border-black rounded-full cursor-pointer overflow-hidden inline-block mr-[-15px]"
                >
                  <img
                    src={ user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div
                  className="w-[30px] h-[30px] border-2 text-white border-black rounded-full cursor-pointer overflow-hidden inline-block mr-[-15px]"
                >
                  <img
                    src={ user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              {/* ))} */}
            </div>

            <div className="mx-3 text-[22px] md:text-[25px] font-semibold">{profileData?.followers?.length}</div>
          </div>
          <div className="text-[18px]  text-[#ffffffc7]">Followers</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center justify-center gap-[10px]">
            <div>
              {/* {profileData?.following?.slice(0, 3).map((follower, index) => ( */}
                <div
                  className="w-[30px] h-[30px] border-2 text-white border-black rounded-full cursor-pointer overflow-hidden inline-block mr-[-15px]"
                >
                  <img
                    src={ user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div
                  className="w-[30px] h-[30px] border-2 text-white border-black rounded-full cursor-pointer overflow-hidden inline-block mr-[-15px]"
                >
                  <img
                    src={ user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
                <div
                  className="w-[30px] h-[30px] border-2 text-white border-black rounded-full cursor-pointer overflow-hidden inline-block mr-[-15px]"
                >
                  <img
                    src={ user}
                    alt=""
                    className="w-full object-cover"
                  />
                </div>
              {/* ))} */}
            </div>

            <div className="mx-3 text-[22px] md:text-[25px] font-semibold">{profileData?.following?.length}</div>
          </div>
          <div className="text-[18px]  text-[#ffffffc7]">Following</div>
        </div>
      </div>

      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] ">
        {profileData?._id == userData?.data?.user._id && 
            <button
            className="bg-white text-black min-w-[150px] h-[40px] cursor-pointer px-[10px] py-[5px] rounded-full font-semibold"
            onClick={()=>navigate("/editprofile")}
            >
            Edit Profile
          </button>
            }

           {profileData?._id != userData?.data?.user._id && 
           <>
            <button
            className="bg-white text-black min-w-[150px] h-[40px] cursor-pointer px-[10px] py-[5px] rounded-full font-semibold"
            // onClick={() => navigate("/editProfile")
            >
            Follow
          </button>

            <button
            className="bg-white text-black min-w-[150px] h-[40px] cursor-pointer px-[10px] py-[5px] rounded-full font-semibold"
            // onClick={() => navigate("/editProfile")
            >
            Message
          </button>
          </>
            }
      </div>


      <div className="w-full min-h-[100vh] border-t border-gray-600 flex  justify-center pt-[30px] pb-[50px] rounded-t-[30px] bg-[#121212]">
            <div className="w-full mx-4  max-w-[900px] flex flex-col items-center bg-white relative gap-[20px] pt-[30px] rounded-lg">
                <BottomNav />
            </div>
      </div>
    </div>
  );
}

export default Profile;
