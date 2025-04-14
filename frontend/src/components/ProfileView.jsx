import React, { useEffect, useState, useRef } from "react";
import useAppContext from "../hooks/useAppContext";
import "../styles/ProfileView.css";
import { HiCamera } from "react-icons/hi2";
import { ProperIcon } from "./PageStructure";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { TwoIcon } from "./Post";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { BiLike } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdWhatsapp } from "react-icons/md";
import { PiShareFatBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { ReactIcons } from "./Post";
import { Activity } from "./Post";
import { BarLink } from "./SideBar";
import { MdPublic } from "react-icons/md";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

const ProfileView = () => {
  const {
    currentUserDatas,
    userDatas
  } = useAppContext();

  const [showReact, setShowReact] = useState(false);
  const navigate = useNavigate();
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const params = useParams();
  const isadmin = jwtDecode(localStorage.getItem('token'))?.id === params?.id;

  const findUserById = (id) => {
    const users = userDatas?.find(user => user?._id === id);
    return users;
  };

  const handlePhotoUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    console.log(file);

    try {
      await axios.put(
        `https://facebook-clone-backendd.onrender.com/api/users/${type}/update/${currentUserDatas?._id}`,
        formData,
      )
      .then((res)=>{
        console.log("Uploaded sucessfully ")
        window.location.reload()
      })
      .catch((err)=>{
        console.log("some error ocurred")
      })
    } catch (err) {
      console.error("Error uploading image", err);
    }
  };

  useEffect(() => {
    findUserById(params?.id);
  }, [params?.id]);
  const userData = findUserById(params?.id);


  return (
    userData?(
    <div className="profile-view">
      <div className="profile-cover">
        <div
          className="cover-div"
          style={{
            backgroundImage: `url(https://facebook-clone-backendd.onrender.com/${userData?.coverPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="cover-image">
            <img
              src={`https://facebook-clone-backendd.onrender.com/${userData?.coverPhoto}`}
              alt="covers"
              className="cover"
            />
            {isadmin && (
              <span className="edit-cover"
                onClick={() => coverInputRef?.current?.click()}
              >
                <i className="cover-camera">
                  <HiCamera />{" "}
                </i>
                Edit Cover Photo 
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={coverInputRef}
                  onChange={(e) => handlePhotoUpload(e, "cover")}
                />
              </span>
            )}
          </div>
        </div>
        <div className="profile-div">
          <div className="profile-info">
            <div className="profile-image">
              <img
                src={`https://facebook-clone-backendd.onrender.com/${userData?.profilePicture}`}
                alt=""
                className="profile-"
              />
              {isadmin&&
                <>
                <i className="camera-icon"
                  onClick={() => profileInputRef?.current?.click()}
                >
                  {" "}
                  <ProperIcon icon={<HiCamera />} />{" "}
                </i>
                <input
                type="file"
                name="image"
                accept="image/*"
                style={{ display: "none" }}
                ref={profileInputRef}
                onChange={(e) => handlePhotoUpload(e, "profile")}
              />
              </>
              }
            </div>

            <div className="details">
              <span className="profile-name">
                {userData?.firstName + " " + userData?.lastName}
              </span>
              <span className="follow">200k followers . 0 following</span>
            </div>
          </div>
          <div className="profile-links">
            <ul>
              <li>Posts</li>
              <li>About</li>
              <li>Mentions</li>
              <li>Reviews</li>
              <li>Reels</li>
              <li>Photoes</li>
              <li>More</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="profile-post">
        {userData.posts ? (
          userData.posts.map((userPost, index) => (
            <div className="post" key={index}>
              <div className="post-header">
                <div
                  className="post-heading"
                  onClick={() => localStorage.setItem("selectedStory", index)}
                >
                  <BarLink
                    photo={userData?.profilePicture}
                    name={`${userData?.firstName} ${userData?.lastName}`}
                    isStory={true}
                    isOnline={true}
                    isPost={true}
                    time={moment(userData?.posts?.createdAt)?.fromNow()}
                    access={<MdPublic />}
                  />
                  <TwoIcon
                    icon1={<PiDotsThreeOutlineFill />}
                    icon2={<RxCross2 />}
                  />
                </div>
                <div className="post-caption">
                  <p>{userPost?.caption}</p>
                </div>
              </div>
              <div className="post-image" onClick={() => navigate("/posts")}>
                {userPost?.image && (
                  <img
                  src={
                    userPost?.image?.startsWith('/uploads')
                      ? `https://facebook-clone-backendd.onrender.com${userPost?.image}`
                      : userPost?.image
                  }
                  
                    alt="Post"
                    className="p-image"
                    onClick={() => localStorage.setItem("selectedStory", index)}
                  />
                )}
                {userPost?.video && (
                  <video
                  src={
                    userPost?.video?.startsWith('/uploads')
                      ? `https://facebook-clone-backendd.onrender.com${userPost?.video}`
                      : userPost?.image
                  }
                  
                    className="p-video"
                    controls
                    autoPlay
                    muted
                  />
                )}
              </div>
              <div
                className="only-reaction"
                onMouseLeave={() => setTimeout(() => setShowReact(false), 500)}
              >
                <div className="activity-counter">
                  <div className="reactions">
                    <span className="reaction">
                      <ReactIcons
                        likeIcon={<AiFillLike />}
                        loveIcon={<BsHeartFill />}
                      />
                    </span>
                    <span className="r-count">{(userPost?.likes?.length)}</span>
                  </div>
                  <div className="com-share">
                    <span className="c-count">{`${(userPost?.comments?.length)} comments`}</span>
                    <span className="s-count">{`${(userPost?.shares?.length)} shares`}</span>
                  </div>
                </div>
                <Activity
                  showReact={showReact}
                  setShowReact={setShowReact}
                  likeIcon={<BiLike />}
                  commentIcon={<TbMessageCircle />}
                  sendIcon={<MdWhatsapp />}
                  shareIcon={<PiShareFatBold />}
                />
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  ):<p>Loading...</p>
  );
};

export default ProfileView;
