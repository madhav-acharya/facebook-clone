import React, { useRef, useState, useEffect } from 'react';
import '../styles/Story.css';
import { Profile } from './NavBar';
import { FaPlus } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import datas from '../assets/json/data.json';
import { useNavigate } from 'react-router-dom';
import useAppContext from '../hooks/useAppContext';
import moment from 'moment';

export const Stories = () => {
  const [dimension, setDimension] = useState(200);
  const [opacityPrev, setOpacityPrev] = useState(0);
  const [opacityNext, setOpacityNext] = useState(1);
  const {storyDatas} = useAppContext();
  const cRef = useRef(null);
  // const [stories, setStories] = useState(datas.post);

  // const mergeStories = ()=>{
  //   storyDatas?setStories([...storyDatas, ...datas.post]):setStories(datas.post)
  //   console.log(stories)
  //   return stories
  // }

  // useEffect(mergeStories, [])

  const nextStory = () =>
  {
    setDimension(cRef.current.clientWidth)
    cRef.current.scrollBy({left:dimension})
    setOpacityPrev(1)
    if (cRef.current.scrollLeft > cRef.current.scrollWidth-cRef.current.clientWidth) 
    {
      setOpacityNext(0)
    }
  }
  const prevStory = () =>
    {
      setDimension(cRef.current.clientWidth)
      cRef.current.scrollBy({left:-dimension})
      if (cRef.current.scrollLeft === 0)
        {
          setOpacityPrev(0)
        }
    }
  return (
    <div className="s-cont" >
      <div className='story-container' ref={cRef} >
          <Story newProfile = {datas.admin.profile} story = {datas.admin.image} isCreateStory = {true} />
          {storyDatas&&storyDatas.map((storyData)=>
            <Story key={storyData.id} newProfile = {datas.admin.profile} story = {storyData.image} name = {localStorage.getItem('firstName')+" "+localStorage.getItem('lastName')} isOnline={datas.admin.isOnline} />
          )}
          {datas.post.map((data)=>
            <Story key={data.id} newProfile = {data.profile} story = {data.image} name = {data.name} isOnline={data.isOnline} />
          )}
          <div className="previous-button" onClick={prevStory} style={{opacity:opacityPrev}}><ConstructButton rawIcon={<GrPrevious />}/></div>
          <div className="next-button" onClick={nextStory} style={{opacity:opacityNext}}><ConstructButton rawIcon={<GrNext />}/></div>
      </div>
    </div>
  )
}

export const Story = ({newProfile, story, video, name, isOnline, isCreateStory}) => {
  const navigate = useNavigate();
  const {storyDatas} = useAppContext();

  const dataFinder = () =>
    {
      try {
        datas.post.map((data)=>{
          if (localStorage.getItem('story') === data.image)
          {
              localStorage.setItem('id', data.id)
              localStorage.setItem('click', "json")
              console.log(localStorage.getItem('click'))
              return data.id;
          }
          return data.id;
      })
      
        storyDatas&&storyDatas.map((data)=>{
          if (localStorage.getItem('story') === data.image)
          {
              localStorage.setItem('id', data.id)
              localStorage.setItem('click', "story")
              return data.id;
          }
          return data.id;
      })
      } catch (error) {
        console.log("error occured in data finder")
      }
      
    
    }
  return (
    <div className="story" style={{backgroundImage : `url(${story})`}} >
      {isCreateStory?
      <div className='own-story' onClick={()=>navigate('/story/create')}>
        <img src= {datas.admin.profile} alt={story} className='own-story-pic'/>
        <div className="create-story"><span>Create Story</span></div>
        <div className="plus-icon"><FaPlus /></div>
      </div>:
      <div className='ons' onClick={(e)=>{
        try {
          navigate('/stories');
          localStorage.setItem('story', e.target.alt)
          dataFinder()
        } catch (error) {
          console.log("error occurred")
        }
        
        }} >
        {story?<img src= {story} alt={story} className='story-pic'/>:<video src={video} className='story-pic' />}
          <div className="story-profile"><Profile profile = {newProfile} isStory isOnline={isOnline}/></div>
          <div className="story-name">
            {name}
          </div>
      </div>}
    </div>
  )
}

export const ConstructButton = ({rawIcon}) => {
  return (
    <div className="construct-button">
      <i className="raw-icon">{rawIcon}</i>
    </div>
  )
}
