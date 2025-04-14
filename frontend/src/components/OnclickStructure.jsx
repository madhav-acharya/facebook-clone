import React, { useEffect, useRef, useState } from "react";
import "../styles/OnclickStructure.css";
import { LeftNav, RightNav } from "./NavBar";
import { RxCross1 } from "react-icons/rx";
import { HiOutlinePlusSm } from "react-icons/hi";
import { BarLink } from "./SideBar";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPhotoFilm } from "react-icons/fa6";
import { ConstructButton } from "./Story";
import { GrPrevious, GrNext } from "react-icons/gr";
import { MdPublic } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { HiVolumeUp } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import { SearchBar } from "./NavBar";
import { ReactionPanel } from "./Post";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import moment from "moment";
import { jwtDecode } from "jwt-decode";
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
import Skeleton from "./Skeleton";

export const OnclickStructure = ({
  leftSidebar,
  rightSidebar,
  onClickContent,
}) => {
  const navigate = useNavigate();
  return (
    <div className="onclick-structure">
      <div className="sec-nav">
        <div className="left-one">
          <div className="only-nav-left">
            <div className="cross-button" onClick={() => navigate("/")}>
              <RxCross1 />
            </div>
            <LeftNav />
          </div>
          {leftSidebar}
        </div>
        {onClickContent}
        <div className="right-one">
          <div className="only-nav-right">
            <RightNav />
          </div>
          {rightSidebar}
        </div>
      </div>
    </div>
  );
};

export const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userDatas } = useAppContext();

  if(!userDatas) return <Skeleton />
  return (
    <div className="left-sidebar">
      <div className="bar-content-left">
        <span className="story-title">Stories</span>
        <span className="other-title">Your Story</span>
        <div className="adds" onClick={() => navigate("/story/create")}>
          <i className="adds-icon">
            <HiOutlinePlusSm />
          </i>
          <BarLink
            name={"Create a story"}
            isStory={true}
            isOnline={true}
            isPost={true}
            time={"share a photo or write something"}
          />
        </div>
        <span className="other-title">All Stories</span>
        <div className="story-link">
          {userDatas?.map((data) => (
            <div className="story-active">
            {data?.stories?.length > 0 && (
            <BarLink
              key={data?._id}
              photo={data?.profilePicture}
              name={`${data?.firstName} ${data?.lastName}`}
              isStory={true}
              added={true}
              storyCount={data?.stories?.length}
              isPost={true}
              time={moment(data?.stories?.[0]?.createdAt)?.fromNow()}
            />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const RightSideBar = () => {
  const [showReact, setShowReact] = useState(false);
  const { postDatas } = useAppContext();
  const index = localStorage.getItem("selectedStory");
  const postData = postDatas?postDatas[Number(index)]:null;

  if(!postData) return <Skeleton />

  return (
    <div className="right-sidebar">
      <div className="bar-content-right">
        <div className="post">
                <div className="post-header">
                  <div className="post-heading">
                    <BarLink
                      photo={postData?.user?.profilePicture}
                      name={`${postData?.user?.firstName} ${postData?.user?.lastName}`}
                      isStory={true}
                      isOnline={true}
                      isPost={true}
                      time={moment(postData?.createdAt)?.fromNow()}
                      access={<MdPublic />}
                    />
                    <TwoIcon icon1={<PiDotsThreeOutlineFill />} icon2={<RxCross2 />} />
                  </div>
                  <div className="post-caption">
                    <p>{postData?.caption}</p>
                  </div>
                </div>
                <br />
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
                      <span className="r-count">{postData?.likes?.length}</span>
                    </div>
                    <div className="com-share">
                      <span className="c-count">{`${postData?.comments?.length} comments`}</span>
                      <span className="s-count">{`${postData?.shares?.length} shares`}</span>
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
        <div className="top-comments">
          <span className="top-comments-title">Top comments</span>
          <i>
            <IoMdArrowDropdown />
          </i>
        </div>
      </div>
    </div>
  );
};

export const OnclickStory = () => {
  const { storyDatas } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(localStorage.getItem("selectedStory")); 

  if(!storyDatas) return <Skeleton />

  const nextStory = () => {
    if (Number(currentIndex&&currentIndex) < storyDatas?.length - 1) {
      setCurrentIndex(Number(currentIndex&&currentIndex) + 1);
    }
  };

  const prevStory = () => {
    if (Number(currentIndex&&currentIndex) > 0) {
      setCurrentIndex(Number(currentIndex&&currentIndex) - 1);
    }
  };

  return (
    storyDatas?(
    <>
      <div className="onclick-story">
        <div
          onClick={prevStory} disabled={Number(currentIndex) === 0}
          style={{ opacity: Number(currentIndex) === 0 ? 0 : 1 }}
        >
          <div className="prev-stb">
            <ConstructButton rawIcon={<GrPrevious />} />
          </div>
        </div>
        <div
          className="inner-story-content"
          style={{ backgroundImage: `url(${storyDatas
            ? storyDatas[Number(currentIndex)].image
            : <p>loading...</p>})` }}
        >
          <div className="stp">
            {storyDatas&&(storyDatas[Number(currentIndex)].image) ? (
              <img
                src={
                  storyDatas?.[Number?.(currentIndex)]?.image?.startsWith("/uploads")
                    ? `https://facebook-clone-backendd.onrender.com/${storyDatas[Number(currentIndex)].image}`
                    : storyDatas?.[Number?.(currentIndex)]?.image
                }
                alt="storyimg"
                className="story-img"
              />
            ) : (
              <video src={storyDatas&&(storyDatas[Number(currentIndex)].video)} className="story-video"></video>
            )}
          </div>

          <div className="story-head">
            <BarLink
              photo={
                storyDatas?.[Number(currentIndex&&currentIndex)]?.user?.profilePicture
              }
              name={
                storyDatas?.[Number(currentIndex)]?.user?.firstName +
                    " " +
                    storyDatas?.[Number(currentIndex)]?.user?.lastName
              }
              isOnline={true}
              isPost={true}
              time={moment(storyDatas?.[Number?.(currentIndex)]?.createdAt)?.fromNow()}
              access={<MdPublic />}
            />
            <div className="story-control-icons">
              <i className="play-pause">
                <FaPlay />
              </i>
              <i className="mute-unmute">
                <HiVolumeUp />
              </i>
              <i className="three-dots">
                <BsThreeDots />
              </i>
            </div>
          </div>
          <div className="reply-reactions">
            <div className="searchh">
              <SearchBar
                widths={"200px"}
                heights={"40px"}
                fontsize={"1rem"}
                placeholder={"Reply..."}
              />
            </div>
            <div className="divvv">
              <ReactionPanel />
            </div>
          </div>
        </div>
        <div
          onClick={nextStory} disabled={Number(currentIndex&&currentIndex) === storyDatas?.length - 1}
          style={{ opacity: Number?.(currentIndex&&currentIndex) === storyDatas?.length - 1 ? 0 : 1 }}
        >
          <div className="next-stb">
            <ConstructButton rawIcon={<GrNext />} />
          </div>
        </div>
      </div>
    </>
  ):<p>Loading...</p>
  );
};

export const OnclickPost = ({ image }) => {
  return (
    <div className="onclick-post">
      <img src={
  image?.startsWith('/uploads')
    ? `https://facebook-clone-backendd.onrender.com${image}`
    : image
}
 alt="onclick-" className="p-image" />
    </div>
  );
};

export const ActualOnclickPost = () => {
  const { postDatas } = useAppContext();
  const currentIndex = localStorage.getItem("selectedStory");
  return (
    <div className="actual-post">
      <OnclickStructure
        rightSidebar={<RightSideBar />}
        onClickContent={<OnclickPost image={postDatas?.[Number(currentIndex)]?.image} />}
      />
    </div>
  );
};

export const ActualOnclickStory = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <p>Error occurred {error.name}</p>}
    >
      <div className="actual-story">
        <OnclickStructure
          leftSidebar={<LeftSideBar />}
          onClickContent={
            <OnclickStory image={localStorage.getItem("story")} />
          }
        />
      </div>
    </ErrorBoundary>
  );
};

export const OnclickCreateStory = () => {
  return (
    <div className="actual-story">
      <OnclickStructure
        leftSidebar={<LeftCreateStoryBar />}
        onClickContent={<CreateStoryCards />}
      />
    </div>
  );
};
export const LeftCreateStoryBar = () => {
  const { currentUserDatas } = useAppContext();
  return (
    <div className="left-sidebar">
      <div className="bar-content-left">
        <span className="story-title">Your Stories</span>
        <div className="create-story-border">
          <BarLink
            photo={currentUserDatas?.profilePicture}
            name={
              (currentUserDatas?.firstName+" "+currentUserDatas?.lastName)
            }
            isOnline={true}
          />
        </div>
      </div>
    </div>
  );
};

export const CreateStoryCards = () => {
  const { storyDatas, getStoryData } = useAppContext();
  const fileInputRef = useRef();
  // const [caption, setCaption] = useState();
  const [photo, setPhoto] = useState();
  const [imageSRC, setImageSRC] = useState();
  const  [storyID, setStoryID] = useState(1);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    storyDatas && setStoryID(storyDatas?.length + 1);
  }, [storyDatas, storyID]);

  useEffect(() => {
      
      const token = localStorage.getItem('token');
      
      if (token) {
        
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken?.id); 
      }
    }, []);

  const handleStorySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('caption', caption)
    console.log(photo);
    formData.append("image", photo);
    formData.append("user", userId);

    axios
      .post("https://facebook-clone-backendd.onrender.com/api/stories/uploads", formData)
      .then((res) => {
        console.log("Uploaded sucessfully ");
        navigate("/");
        getStoryData();
      })
      .catch((err) => {
        console.log("some error ocurred", err.message);
      });
  };

  const handleFileChange = (e) => {
    setPhoto(e?.target?.files[0]);
    const imgFile = e.target.files[0];
    const imgURL = URL.createObjectURL(imgFile);
    setImageSRC(imgURL);
  };
  return (
    <form className="story-upload-container">
      <div className="story-cards">
        <div
          className="create-photo"
          onClick={() => fileInputRef?.current?.click()}
        >
          <ConstructButton rawIcon={<FaPhotoFilm />} />
          <span>Create a photo story</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div className="create-text">
          <ConstructButton rawIcon={"Aa"} />
          <span>Create a text story</span>
        </div>
        {imageSRC && (
          <img src={imageSRC} alt={imageSRC} className="create-story-image" />
        )}
      </div>
      <div className="story-uploads-buttons">
        <button className="discard-btn" onClick={() => setImageSRC("")}>
          Discard
        </button>
        <button type="submit" className="share-btn" onClick={handleStorySubmit}>
          Share to story
        </button>
      </div>
    </form>
  );
};
