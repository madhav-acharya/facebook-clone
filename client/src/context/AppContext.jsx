import React,{ createContext, useEffect, useState } from "react";
import axios from "axios";
import datas from '../assets/json/data.json'

export const AppContext = createContext();

export const AppProvider = ({children}) =>
{
    const [isLive, setIsLive] = useState(false);
    const [isPost, setIsPost] = useState(false);
    const [isReel, setIsReel] = useState(false);  
    const [uploadPopup, setUploadPopup] = useState(false);
    const [postDatas, setPostDatas] = useState();
    const [storyDatas, setStoryDatas] = useState();


    const getData = async ()=>{
        await axios.get('http://localhost:3001/get')
        .then((res)=>{
          console.log("got sucessfully ")
          setPostDatas(res.data)
        })
        .catch((err)=>{
          console.log("some error ocurred",err.message)
        })
      }

      const getStoryData = async ()=>{
        await axios.get('http://localhost:3001/get-story')
        .then((res)=>{
          console.log("got sucessfully ")
          setStoryDatas(res.data)
        })
        .catch((err)=>{
          console.log("some error ocurred",err.message)
        })
      }

    useEffect(()=>{
        getData()
        getStoryData()
    }, [])
    
    return(
        <AppContext.Provider value={{isLive, setIsLive, isPost, setIsPost, isReel, setIsReel, uploadPopup, setUploadPopup, postDatas, getData, storyDatas, getStoryData}}>
            {children}
        </AppContext.Provider>
    )
}