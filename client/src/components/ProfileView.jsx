import React from "react";
import "../styles/ProfileView.css";
import datas from '../assets/json/data.json';
import { HiCamera } from "react-icons/hi2";
import { ProperIcon } from "./PageStructure";

const ProfileView = () => {
  return (
    <div className="profile-view">
      <div className="profile-cover">
        <div
          className="cover-div"
          style={{
            backgroundImage: `url(${datas.admin.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="cover-image">
            <img
              src={datas.admin.cover}
              alt="covers"
              className="cover"
            />
            <span className="edit-cover">
            <i className="cover-camera"><HiCamera /> </i>Edit Cover Photo
          </span>
          </div>
        </div>
        <div className="profile-div">
          <div className="profile-info">
            <div className="profile-image">
              <img src={datas.admin.cover} alt="" className="profile-"/>
              <i className="camera-icon"> <ProperIcon icon={<HiCamera />}/> </i>
            </div>
            
            <div className="details">
              <span className="profile-name">Madan Acharya</span>
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
    </div>
  );
};

export default ProfileView;
