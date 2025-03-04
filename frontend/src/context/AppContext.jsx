import React,{ createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

export const AppProvider = ({children}) =>
{
    const [isLive, setIsLive] = useState(false);
    const [isPost, setIsPost] = useState(false);
    const [isReel, setIsReel] = useState(false);  
    const [uploadPopup, setUploadPopup] = useState(false);
    const [postDatas, setPostDatas] = useState();
    const [storyDatas, setStoryDatas] = useState();
    const [userDatas, setUserDatas] = useState();
    const [currentUserDatas, setCurrentUserDatas] = useState();

    const getData = async ()=>{
        await axios.get('https://facebook-clone-backendd.onrender.com/api/posts/get')
        .then((res)=>{
          console.log("got sucessfully ")
          setPostDatas(res.data)
        })
        .catch((err)=>{
          console.log("some error ocurred",err.message)
        })
      }
      const getUsers = async ()=>{
        await axios.get('https://facebook-clone-backendd.onrender.com/api/users/')
        .then((res)=>{
          console.log("got sucessfully ")
          setUserDatas(res.data)
        })
        .catch((err)=>{
          console.log("some error ocurred",err.message)
        })
      }
      const getCurrentUser = async ()=>{
        await axios.get(`https://facebook-clone-backendd.onrender.com/api/users/${jwtDecode(localStorage.getItem('token')).id}`)
        .then((res)=>{
          console.log("got sucessfully ")
          setCurrentUserDatas(res.data)
        })
        .catch((err)=>{
          console.log("some error ocurred",err.message)
        })
      }

      const getStoryData = async ()=>{
        await axios.get('https://facebook-clone-backendd.onrender.com/api/stories/')
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
        getUsers()
        getCurrentUser()
    }, [])
    
    return(
        <AppContext.Provider  value={{isLive, setIsLive, isPost, setIsPost, isReel, setIsReel, uploadPopup, setUploadPopup, postDatas, getData, storyDatas, getStoryData, userDatas, getUsers, currentUserDatas, getCurrentUser}}>
            {children}
        </AppContext.Provider>
    )
}