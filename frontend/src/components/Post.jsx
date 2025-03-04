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
import useAppContext from "../hooks/useAppContext";
import moment from "moment";
import axios from "axios";

export const Post = () => {
  const [showReact, setShowReact] = useState(false);
  const navigate = useNavigate();
  const { postDatas } = useAppContext();

  return postDatas ? (
    postDatas.map((postData, index) => (
      <div className="post" key={index}>
        <div className="post-header">
          <div className="post-heading" 
           onClick={() => {localStorage.setItem("selectedStory", index);}}
              >
            <BarLink
              key={index}
              photo={postData.user.profilePicture}
              name={postData.user.firstName + " " + postData.user.lastName}
              isStory={true}
              isOnline={true}
              isPost={true}
              time={moment(postData.createdAt).fromNow()}
              access={<MdPublic />}
              _id={postData.user._id}
              
            />
            <TwoIcon icon1={<PiDotsThreeOutlineFill />} icon2={<RxCross2 />} />
          </div>
          <div className="post-caption">
            <p>{postData.caption}</p>
          </div>
        </div>
        <div
          className="post-image"
          onClick={() => {
            navigate("/posts");
          }}
        >
          {postData.image && (
            <img
              src={postData.image}
              alt={postData.image}
              className="p-image"
              onClick={() => {
                localStorage.setItem("selectedStory", index);
              }
              }
            />
          )}
          {postData.video && (
            <video
              src={postData.video}
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
                {
                  <ReactIcons
                    likeIcon={<AiFillLike />}
                    loveIcon={<BsHeartFill />}
                  />
                }
              </span>
              <span className="r-count">{postData.likes.length}</span>
            </div>
            <div className="com-share">
              <span className="c-count">{`${postData.comments.length} comments`}</span>
              <span className="s-count">{`${postData.shares.length} shares`}</span>
            </div>
          </div>
          <Activity
            showReact={showReact}
            setShowReact={setShowReact}
            likeIcon={<BiLike />}
            commentIcon={<TbMessageCircle />}
            sendIcon={<MdWhatsapp />}
            shareIcon={<PiShareFatBold />}
            post={postData}
          />
        </div>
      </div>
    ))
  ) : (
    <p>Loading...</p>
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
  post
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
              <ReactionPanel setShowReact={setShowReact} post={post}/>
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

export const ReactionPanel = ({ setShowReact, post }) => {
  const {currentUserDatas} = useAppContext();
  const userId = currentUserDatas._id;
  const [likes, setLikes] = useState(post&&post.likes.length);
  const [liked, setLiked] = useState(post&&post.likes.includes(userId));

  const handleLike = async () => {
    try {
      const response = await axios.put("http://localhost:3001/api/posts/like", { postId: post._id, userId });
      setLikes(response.data.likes.length);
      setLiked(response.data.likes.includes(userId));
    } catch (error) {
      console.error("Error liking post:", error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      {
        <div className="reaction-panel">
          <div className="likee" onClick={() => {setShowReact(false); handleLike();}}>
            <i className="react-icon like-icon abs ">
              <AiFillLike />
            </i>
          </div>
          <div className="love" onClick={() => {setShowReact(false); handleLike();}}>
            <i className="react-icon love-icon abs">
              <BsHeartFill />
            </i>
          </div>
          <div className="care" onClick={() => {setShowReact(false); handleLike();}}>
            <img src="./images/care.png" alt="care" className="care" />
          </div>
          <div className="haha" onClick={() => {setShowReact(false); handleLike();}}>
            <img src="./images/haha.png" alt="haha" className="haha" />
          </div>
          <div className="wow" onClick={() => {setShowReact(false); handleLike();}}>
            <img src="./images/wow.png" alt="wow" className="wow" />
          </div>
          <div className="sad" onClick={() => {setShowReact(false); handleLike();}}>
            <img src="./images/sad.png" alt="sad" className="sad" />
          </div>
          <div className="angry" onClick={() => {setShowReact(false); handleLike();}}>
            <img src="./images/angry.png" alt="angry" className="angry" />
          </div>
        </div>
      }
    </>
  );
};

