import React, { useState } from 'react';
import '../styles/Home.css'
import {NavBar, BelowNav} from '../components/NavBar';
import {Post} from '../components/Post';
import {Stories} from '../components/Story';
import { LeftBar, RightBar } from '../components/SideBar';
import { NewMessage } from '../components/PageStructure';
import { SideOverlay } from '../components/SideOverlay';
import datas from '../assets/json/data.json';
import useAppContext from '../hooks/useAppContext';
import moment from 'moment';

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);
  const {postDatas} = useAppContext();
  // const [timeDiff, setTimeDiff] = useState()
  
  return (
    <>
    {<div className="home-page">
        <NavBar setShowMessage={setShowMessage} showMessage={showMessage}/>
      <div className="main">
        <LeftBar />
        <div className="feed">
          <BelowNav />
          <Stories />
          {showMessage&&<SideOverlay />}
        <NewMessage />
        {postDatas&&<Post key={postDatas&&postDatas[postDatas.length-1].id} profile={postDatas&&datas.admin.profile} name={localStorage.getItem('firstName')+" "+localStorage.getItem('lastName')} time={postDatas&&moment(postDatas[postDatas.length-1].time).fromNow()} isOnline={datas.admin.isOnline} image={postDatas&&postDatas[postDatas.length-1].image} caption={postDatas&&postDatas[postDatas.length-1].caption} reactionCount={datas.admin.reactionCount} commentCount={datas.admin.commentCount} shareCount={datas.admin.shareCount} />}

        {datas.post.map((data) => (
            <Post key={data.id} profile={data.profile} name={data.name} time={data.time} isOnline={data.isOnline} image={data.image} caption={data.caption} reactionCount={data.reactionCount} commentCount={data.commentCount} shareCount={data.shareCount} />
          ))}
       
        {postDatas&&postDatas.map((postData) => (
            <Post key={postDatas&&postData.id} profile={datas.admin.profile} name={localStorage.getItem('firstName')+" "+localStorage.getItem('lastName')} time={postDatas&&moment(postData.time).fromNow()} isOnline={datas.admin.isOnline} image={postDatas&&postData.image} caption={postDatas&&postData.caption} reactionCount={datas.admin.reactionCount} commentCount={datas.admin.commentCount} shareCount={datas.admin.shareCount} />
          ))}

        </div>
       
        <RightBar />
      </div>
      <NewMessage />
    </div>}
      
    </>
  )
}

export default Home