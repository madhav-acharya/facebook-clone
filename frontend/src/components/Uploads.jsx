import React, { useRef, useState, useEffect } from 'react';
import '../styles/Uploads.css';
import { RxCross1 } from "react-icons/rx";
import { BarLink } from './SideBar';
import { FaUserFriends } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { RiLiveFill } from "react-icons/ri";
import axios from 'axios';
import useAppContext from '../hooks/useAppContext';
// import datas from '../assets/json/data.json';
import { jwtDecode } from "jwt-decode";


export const Uploads = ({isLive, isPost, isReel}) => {
  const {setUploadPopup, getData, postDatas, currentUserDatas} = useAppContext();
  const fileInputRef = useRef(null);
  const [caption, setCaption] = useState();
  const [photo, setPhoto] = useState();
  const [postID, setPostID] = useState(1);
  const [userId, setUserId] = useState('');
  const [imageSRC, setImageSRC] = useState();

  useEffect(()=>{postDatas&&setPostID(postDatas.length+1) }, [postID, postDatas])

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    
    if (token) {
      
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id); 
    }
  }, []);

  const handlePostSubmit = (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", userId);
    formData.append('caption', caption)
    formData.append('image', photo)


    axios.post('https://facebook-clone-backendd.onrender.com/api/posts/uploads', formData)
    .then((res)=>{
      console.log("Uploaded sucessfully ")
      setUploadPopup(false)
      getData();
    })
    .catch((err)=>{
      console.log("some error ocurred")
    })
  }
  const handleFileChange = (e)=>{
    setPhoto(e.target.files[0])
    const imgFile = e.target.files[0]
    const imgURL = URL.createObjectURL(imgFile)
    setImageSRC(imgURL)
  }
  
  return (
    <div className="upload-container" >
        <div className="up-title">
          {isLive&&<span>Start Live</span>}
          {isPost&&<span>Create Post</span>}
          {isReel&&<span>Create Reel</span>}
          <i ><RxCross1 onClick={()=>{setUploadPopup(false)}}/></i>
        </div>
        <div className="upload-profile"><BarLink photo={currentUserDatas?currentUserDatas.profilePicture:<p>loading...</p>} name={currentUserDatas?(currentUserDatas.firstName+" "+currentUserDatas.lastName):<p>loading...</p>}  isPost={true} access={<AccessTag accessIcon={<FaUserFriends />} accessTitle={"Friends"} changeIcon={<IoMdArrowDropdown />} />}/>
        </div>
        <form onSubmit={handlePostSubmit}>
          <div className="write-something">
            <input type="text" className='write-input' placeholder={`What's on your mind, ${currentUserDatas?currentUserDatas.firstName:<p>loading..</p>}`} onChange={(e)=>setCaption(e.target.value)}/>
            <i className="emoji"> <BsEmojiSmile /> </i>
          </div>
          {<div className="browse-cont">
            <div className="add-cont" onClick={()=>fileInputRef.current.click()} >
              
              <div className="cross"  ><RxCross1 /></div>
              <i className="add-icon">{isLive?<RiLiveFill />:<RiImageAddFill />}</i>
              <span className="big-text">{isLive?'Start Live Video':(isPost?'Add Photoes or videos': 'Add Reel')}</span>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }} 
                onChange={handleFileChange}
            />
              <span className="small-text">{isLive?"or create live events":"or drag or drop"}</span>
              {imageSRC&&<img src={imageSRC} alt="bgbggg" className='small-image'/>}
            </div>
          </div>}
          <div className="post-button"><button type='submit' style={{backgroundColor:caption || photo?'blue': "", color:caption || photo?'white': ""}}>Post</button></div>
        </form>
    </div>
  )
}

export const AccessTag = ({accessIcon, accessTitle, changeIcon}) =>
{
  return(
    <div className="access-tag">
      <i className="access-icon">{accessIcon}</i>
      <span className="access-title">{accessTitle}</span>
      <i className="change-icon">{changeIcon}</i>
    </div>
  )
}