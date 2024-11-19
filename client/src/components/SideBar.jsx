import React ,{useEffect, useRef, useState} from "react";
import "../styles/SideBar.css";
import { Profile } from "./NavBar";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import datas from "../assets/json/data.json";
import { useNavigate } from "react-router-dom";

export const LeftBar = () => {
  const navigate = useNavigate();
  return (
    <div className="leftBar">
      <BarLink
        photo={datas.admin.profile}
        name={
          localStorage.getItem("firstName") +
          " " +
          localStorage.getItem("lastName")
        }
        isOnline={datas.admin.isOnline}
      />
      <div className="links" onClick={() => navigate("/")}>
        <BarLink photo={"/images/friend.png"} name={"Friends"} />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink
          photo={"/images/p-dashboard.png"}
          name={"Professional DashBoard"}
        />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink photo={"/images/feeds.png"} name={"Feeds"} />
      </div>
      <div className="links" onClick={() => navigate("/groups")}>
        <BarLink photo={"/images/groups.png"} name={"Groups"} />
      </div>
      <div className="links" onClick={() => navigate("/marketplace")}>
        <BarLink photo={"/images/marketplace.png"} name={"MarketPlace"} />
      </div>
      <div className="links" onClick={() => navigate("/watch")}>
        <BarLink photo={"/images/watch.png"} name={"Videos"} />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink photo={"/images/memories.png"} name={"Memories"} />
      </div>
      <div className="links s-links" onClick={() => navigate("/")}>
        <BarLink photo={"/images/bookmark.png"} name={"Saved"} />
      </div>
      <div className="links s-links" onClick={() => navigate("/")}>
        <BarLink photo={"/images/flag.png"} name={"Pages"} />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink
          icon={
            <div className="see-more">
              <IoIosArrowDown />
            </div>
          }
          name={"See more"}
        />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarTitle title={"Your shortcuts"} />
      </div>
    </div>
  );
};

export const RightBar = () => {
  return (
    <div className="rightBar">
      <BarTitle
        title={"Your Pages and Profiles"}
        icon2={<PiDotsThreeOutlineFill />}
      />
      <BarTitle
        title={"Contacts"}
        icon1={<FaSearch />}
        icon2={<PiDotsThreeOutlineFill />}
      />
      {datas.post.map((data) => (
        <BarLink
          key={data.id}
          photo={data.profile}
          name={data.name}
          isStory={true}
          isOnline={data.isOnline}
        />
      ))}
    </div>
  );
};

export const BarLink = ({
  photo,
  icon,
  name,
  isStory,
  isOnline,
  isPost,
  time,
  access,
  added,
  storyCount,
  msg,
}) => {
  const navigate = useNavigate();
  const targetProfile = useRef(null);
  const targetPhoto = useRef(null);
  // const [pp, setPP] = useState();
  // const [names, setNames] = useState();

  
  return (
    <div className="bar-links" onClick={(e)=>{targetProfile.current.click(); targetPhoto.current.click()}}>
      {photo ? (
        <div className="ppp" ref={targetPhoto} onClick={(e)=>{console.log(e.target.firstChild.firstChild.alt);  localStorage.setItem('pp', e.target.firstChild.firstChild.alt);}}>
           <Profile profile={photo} isOnline={isOnline} isStory={isStory} />
        </div>
       
      ) : (
        <i className="bar-icon">{icon}</i>
      )}
      <div className="info">
        <span className="p-name" ref={targetProfile} onClick={(e)=>{navigate('/profile'); console.log(e.target.innerText); localStorage.setItem('names', e.target.innerText);}}>{name}</span>
        {isPost && (
          <div className="for-post">
            {added && (
              <>
                {" "}
                <span className="blue-font">{`${storyCount} new `} </span>{" "}
                <span className="full-stop">.</span>{" "}
              </>
            )}
            {!msg && <span>{time}</span>}
            {access && (
              <>
                {" "}
                <span className="full-stop">.</span>{" "}
                <span className="access-icon">{access}</span>{" "}
              </>
            )}
            {msg && (
              <>
                {" "}
                <span className="msg">{msg}</span> .
                <span className="msg-time">{time}</span>{" "}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const BarTitle = ({ title, icon1, icon2 }) => {
  return (
    <div className="bar-title">
      <span className="title">{title}</span>
      <div className="icons">
        <i className="icon1">{icon1}</i>
        <i className="icon2">{icon2}</i>
      </div>
    </div>
  );
};

export const Menu = () => {
  return <div className="menu"></div>;
};
