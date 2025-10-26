import React from 'react'
import LeftHome from '../components/Home/LeftHome'
import FeedBox from '../components/Home/FeedBox'
import RightHome from '../components/Home/RightHome'

function Home() {
  return (
    <div className='w-full flex justify-center items-center'>
      <LeftHome />
      <FeedBox />
      <RightHome />
    </div>
  )
}

export default Home