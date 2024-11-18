import React from 'react';
import '../styles/Watch.css'
import { PageStructure, PageSideBar, PageBarLink } from '../components/PageStructure';
import { PiMonitorPlayFill } from 'react-icons/pi';
import { RiLiveFill } from "react-icons/ri";
import { BiSolidMoviePlay } from "react-icons/bi";
import { ImTv } from "react-icons/im";
import { FaRocket } from "react-icons/fa";
import { HiMiniBookmark } from "react-icons/hi2";
import { Post } from '../components/Post';
import datas from '../assets/json/data.json';

export const Watch = () => {
  return (
    <div className="watch">
      <PageStructure 
        pageSideBar = {<PageSideBar pageName={"Watch"} pageBarLinks={<WatchLinks />}/>}/>
      <WatchContent />
    </div>
  )
}

export const WatchLinks = () => {
  return (
    <div className="watch-links">
      <PageBarLink linkName={"Home"} linkIcon={<PiMonitorPlayFill />}/> 
      <PageBarLink linkName={"Live"} linkIcon={<RiLiveFill />}/>
      <PageBarLink linkName={"Reels"} linkIcon={<BiSolidMoviePlay />}/>
      <PageBarLink linkName={"Shows"} linkIcon={<ImTv />}/>
      <PageBarLink linkName={"Explore"} linkIcon={<FaRocket />}/>
      <PageBarLink linkName={"Saved Videos"} linkIcon={<HiMiniBookmark />}/>
    </div>
  )
}


export const WatchContent = () => {
  return (
    <div className="watch-content">
      {datas.post.map((data) => 
        <Post key={data.id} profile={data.profile} name={data.name} time={data.time} isOnline={data.isOnline} video={data.video} caption={data.caption} reactionCount={data.reactionCount} commentCount={data.commentCount} shareCount={data.shareCount}/>
      )}
    </div>
  )
}
