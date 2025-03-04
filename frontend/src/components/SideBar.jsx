import React  from "react";
import "../styles/SideBar.css";
import { Profile } from "./NavBar";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import useAppContext from "../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const LeftBar = () => {
  const navigate = useNavigate();
  const {currentUserDatas} = useAppContext();
  return (
    <div className="leftBar">
      <BarLink
        photo={currentUserDatas?currentUserDatas.profilePicture:<p>loading...</p>}
        name={
          currentUserDatas?(currentUserDatas.firstName+" "+currentUserDatas.lastName):<p>loadings...</p>
        }
        isOnline={true}
        _id={currentUserDatas?currentUserDatas._id:""}
      />
      <div className="links" onClick={() => navigate("/")}>
        <BarLink photos={"/images/friend.png"} name={"Friends"} />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink
          photos={"/images/p-dashboard.png"}
          name={"Professional DashBoard"}
        />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink photos={"/images/feeds.png"} name={"Feeds"} />
      </div>
      <div className="links" onClick={() => navigate("/groups")}>
        <BarLink photos={"/images/groups.png"} name={"Groups"} />
      </div>
      <div className="links" onClick={() => navigate("/marketplace")}>
        <BarLink photos={"/images/marketplace.png"} name={"MarketPlace"} />
      </div>
      <div className="links" onClick={() => navigate("/watch")}>
        <BarLink photos={"/images/watch.png"} name={"Videos"} />
      </div>
      <div className="links" onClick={() => navigate("/")}>
        <BarLink photos={"/images/memories.png"} name={"Memories"} />
      </div>
      <div className="links s-links" onClick={() => navigate("/")}>
        <BarLink photos={"/images/bookmark.png"} name={"Saved"} />
      </div>
      <div className="links s-links" onClick={() => navigate("/")}>
        <BarLink photos={"/images/flag.png"} name={"Pages"} />
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
  const {userDatas} = useAppContext();
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
      {userDatas?userDatas.map((data) => (
        <BarLink
          key={data._id}
          photo={data.profilePicture}
          name={data.firstName+" "+data.lastName}
          isStory={true}
          isOnline={true}
          _id={data._id}
        />
      )):<p>Loading...</p>}
    </div>
  );
};

export const BarLink = ({
  photo,
  photos,
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
  _id
}) => {

  return (
    <div className="bar-links" >
      {photo || photos ? (
        <div className="ppp"  >
           <Profile profile={photo} profiles={photos} isOnline={isOnline} isStory={isStory} _id={_id} name={name}/>
        </div>
       
      ) : (
        <i className="bar-icon">{icon}</i>
      )}
      <div className="info">
        <NavLink to={`/${name}/${_id}`} className={"p-name"} >{name}</NavLink>
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
