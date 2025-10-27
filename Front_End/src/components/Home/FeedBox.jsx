import React from 'react'
import logo from "../../assets/social2.png";
import { FaRegHeart } from "react-icons/fa6";
import StoryCard from '../StoryCard';
import BottomNav from '../BottomNav';

function FeedBox() {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden" >
              <img src={logo} alt="" className="w-[80px]" />
              <div>
                <FaRegHeart className="text-white w-[25px] h-[25px]" />
              </div>
            </div>

            <div className='w-full flex overflow-auto gap-[10px] items-center p-[20px]'>
              <StoryCard username={"nameSettingdedeedede"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
              <StoryCard username={"nameSetting"} />
            </div>

            <div className='w-full min-h-[100vh] flex flex-col gap-[20px] p-[10px] items-center pt-[30px] bg-gray-800/10 lg:bg-white  relative pb-[120px]'>
              {/* Feeds will be shown here */}

              <BottomNav />
            </div>

            
    </div>
  )
}

export default FeedBox