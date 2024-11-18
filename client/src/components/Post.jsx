import React, { useState } from "react";
import "../styles/Post.css";
import { MdPublic } from "react-icons/md";
import { BarLink } from "./SideBar";
import { RxCross2 } from "react-icons/rx";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { MdWhatsapp } from "react-icons/md";
import { PiShareFatBold } from "react-icons/pi";
import { AiFillLike } from "react-icons/ai";
import { BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import datas from "../assets/json/data.json";
import useAppContext from "../hooks/useAppContext";

export const Post = ({
  profile,
  name,
  time,
  isOnline,
  image,
  video,
  caption,
  reactionCount,
  commentCount,
  shareCount,
}) => {
  const [showReact, setShowReact] = useState(false);
  return (
    <div className="post">
      <div className="post-header">
        <PostHeading
          profile={profile}
          name={name}
          time={time}
          isOnline={isOnline}
        />
        <PostCaption caption={caption} />
      </div>
      <PostImage image={image} video={video} />
      <div
        className="only-reaction"
        onMouseLeave={() => setTimeout(() => setShowReact(false), 500)}
      >
        <ActivityCounter
          likeIcon={<AiFillLike />}
          loveIcon={<BsHeartFill />}
          reactionCount={reactionCount}
          commentCount={commentCount}
          shareCount={shareCount}
        />
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
  );
};

export const PostHeading = ({ profile, name, time, isOnline }) => {
  return (
    <div className="post-heading">
      <BarLink
        photo={profile}
        name={name}
        isStory={true}
        isOnline={isOnline}
        isPost={true}
        time={time}
        access={<MdPublic />}
      />
      <TwoIcon icon1={<PiDotsThreeOutlineFill />} icon2={<RxCross2 />} />
    </div>
  );
};

export const TwoIcon = ({ icon1, icon2 }) => {
  return (
    <div className="two-icon">
      <i className="icon1">{icon1}</i>
      <i className="icon2">{icon2}</i>
    </div>
  );
};

export const PostCaption = ({ caption }) => {
  return (
    <div className="post-caption">
      <p>{caption}</p>
    </div>
  );
};

export const PostImage = ({ image, video }) => {
  const navigate = useNavigate();
  const { postDatas } = useAppContext();
  const dataFinder = () => {
    datas.post.map((data) => {
      if (localStorage.getItem("post") === data.image) {
        console.log("data", data.id);
        localStorage.setItem("id", data.id);
        localStorage.setItem("click", "json");
        console.log(localStorage.getItem("click"));
        return data.id;
      }
      return data.id;
    });

    postDatas &&
      postDatas.map((data) => {
        if (localStorage.getItem("post") === data.image) {
          console.log("data", data.id);
          localStorage.setItem("id", data.id);
          localStorage.setItem("click", "post");
          console.log(localStorage.getItem("click"));
          return data.id;
        }
        return data.id;
      });
  };
  return (
    <div
      className="post-image"
      onClick={(e) => {
        navigate("/posts");
        console.log(e.target.alt);
        localStorage.setItem("post", e.target.alt);
        dataFinder();
      }}
    >
      {image && <img src={image} alt={image} className="p-image" />}
      {video && (
        <video src={video} className="p-video" controls autoPlay muted />
      )}
    </div>
  );
};

export const ActivityCounter = ({
  likeIcon,
  loveIcon,
  reactionCount,
  commentCount,
  shareCount,
}) => {
  return (
    <div className="activity-counter">
      <div className="reactions">
        <span className="reaction">
          {<ReactIcons likeIcon={likeIcon} loveIcon={loveIcon} />}
        </span>
        <span className="r-count">{reactionCount}</span>
      </div>
      <div className="com-share">
        <span className="c-count">{`${commentCount} comments`}</span>
        <span className="s-count">{`${shareCount} shares`}</span>
      </div>
    </div>
  );
};
export const Activity = ({
  showReact,
  setShowReact,
  likeIcon,
  commentIcon,
  sendIcon,
  shareIcon,
}) => {
  return (
    <div className="panel">
      <div className="activity">
        <div
          className="like"
          onMouseEnter={() => setTimeout(() => setShowReact(true), 500)}
        >
          <i>{likeIcon}</i>
          <span>Like</span>
          {showReact && (
            <div className="r-panel">
              <ReactionPanel />
            </div>
          )}
        </div>
        <div className="comment">
          <i className="com-icon">{commentIcon}</i>
          <span>Comment</span>
        </div>
        <div className="send">
          <i>{sendIcon}</i>
          <span>Send</span>
        </div>
        <div className="share">
          <i>{shareIcon}</i>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};
export const ReactIcons = ({ likeIcon, loveIcon }) => {
  return (
    <div className="react-icons">
      <i className="react-icon like-icon">{likeIcon}</i>
      <i className="react-icon love-icon">{loveIcon}</i>
    </div>
  );
};

export const ReactionPanel = ({ likeIcon, loveIcon }) => {
  return (
    <>
      {
        <div className="reaction-panel">
          <div className="likee">
            <i className="react-icon like-icon abs ">
              <AiFillLike />
            </i>
          </div>
          <div className="love">
            <i className="react-icon love-icon abs">
              <BsHeartFill />
            </i>
          </div>
          <div className="care">
            <img src="./images/care.png" alt="care" className="care" />
          </div>
          <div className="haha">
            <img src="./images/haha.png" alt="haha" className="haha" />
          </div>
          <div className="wow">
            <img src="./images/wow.png" alt="wow" className="wow" />
          </div>
          <div className="sad">
            <img src="./images/sad.png" alt="sad" className="sad" />
          </div>
          <div className="angry">
            <img src="./images/angry.png" alt="angry" className="angry" />
          </div>
        </div>
      }
    </>
  );
};
