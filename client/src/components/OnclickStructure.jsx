import React, { useEffect, useRef, useState } from "react";
import "../styles/OnclickStructure.css";
import { LeftNav, RightNav } from "./NavBar";
import { RxCross1 } from "react-icons/rx";
import { HiOutlinePlusSm } from "react-icons/hi";
import { BarLink } from "./SideBar";
import { Post } from "./Post";
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
import datas from "../assets/json/data.json";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import moment from "moment";

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
          {datas.post.map((data) => (
            <BarLink
              key={data.id}
              photo={data.profile}
              name={data.name}
              isStory={true}
              added={true}
              storyCount={1}
              isPost={true}
              time={data.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const RightSideBar = () => {
  const [nextID, setNextID] = useState(Number(localStorage.getItem("id") - 1));
  const [click, setClick] = useState();

  useEffect(() => setClick(localStorage.getItem("click")), []);
  return (
    <div className="right-sidebar">
      <div className="bar-content-right">
        <Post
          profile={
            click === "json" ? datas.post[nextID].profile : datas.admin.profile
          }
          name={
            click === "json"
              ? datas.post[nextID].name
              : localStorage.getItem("firstName") +
                " " +
                localStorage.getItem("lastName")
          }
          time={datas.post[nextID].time}
          caption={datas.post[nextID].caption}
          reactionCount={datas.post[nextID].reactionCount}
          commentCount={datas.post[nextID].commentCount}
          shareCount={datas.post[nextID].shareCount}
        />
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

export const OnclickStory = ({ image, video }) => {
  const [nextID, setNextID] = useState(Number(localStorage.getItem("id") - 1));
  const [opacityPrev, setOpacityPrev] = useState(1);
  const [opacityNext, setOpacityNext] = useState(1);
  const [click, setClick] = useState();
  const { storyDatas } = useAppContext();

  useEffect(() => setClick(localStorage.getItem("click")), []);
  click && console.log("click", click);

  return (
    <>
      <div className="onclick-story">
        <div
          onClick={() => {
            if (nextID > 0) {
              setNextID(nextID - 1);
              setOpacityNext(1);
              nextID === 1 && setOpacityPrev(0);
            } else {
              setOpacityPrev(0);
            }
          }}
          style={{ opacity: opacityPrev }}
        >
          <div className="prev-stb">
            <ConstructButton rawIcon={<GrPrevious />} />
          </div>
        </div>
        <div
          className="inner-story-content"
          style={{ backgroundImage: `url(${datas.post[nextID].image})` }}
        >
          <div className="stp">
            {image ? (
              <img
                src={
                  click === "json"
                    ? datas.post[nextID].image
                    : storyDatas && storyDatas[nextID].image
                }
                alt="storyimg"
                className="story-img"
              />
            ) : (
              <video src={video} className="story-video"></video>
            )}
          </div>

          <div className="story-head">
            <BarLink
              photo={
                click === "json"
                  ? datas.post[nextID].profile
                  : datas.admin.profile
              }
              name={
                click === "json"
                  ? datas.post[nextID].name
                  : localStorage.getItem("firstName") +
                    " " +
                    localStorage.getItem("lastName")
              }
              isOnline={true}
              isPost={true}
              time={click === "json"
                  ? datas.post[nextID].time
                  : storyDatas&&moment(storyDatas[nextID].time).fromNow()}
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
          onClick={() => {
            if (
              nextID + 1 <
              (click === "json"
                ? datas.post.length
                : storyDatas && storyDatas.length)
            ) {
              setNextID(nextID + 1);
              setOpacityPrev(1);
              if (click === "json") {
                if (nextID === datas.post.length - 2) {
                  setOpacityNext(0);
                }
              } else {
                if (storyDatas && nextID === storyDatas.length - 2) {
                  setOpacityNext(0);
                }
              }
              
            } else {
              setOpacityNext(0);
            }
          }}
          style={{ opacity: opacityNext }}
        >
          <div className="next-stb">
            <ConstructButton rawIcon={<GrNext />} />
          </div>
        </div>
      </div>
    </>
  );
};

export const OnclickPost = ({ image }) => {
  return (
    <div className="onclick-post">
      <img src={image} alt="onclick-" className="p-image" />
    </div>
  );
};

export const ActualOnclickPost = () => {
  return (
    <div className="actual-post">
      <OnclickStructure
        rightSidebar={<RightSideBar />}
        onClickContent={<OnclickPost image={localStorage.getItem("post")} />}
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
  return (
    <div className="left-sidebar">
      <div className="bar-content-left">
        <span className="story-title">Your Stories</span>
        <div className="create-story-border">
          <BarLink
            photo={datas.admin.profile}
            name={
              localStorage.getItem("firstName") +
              " " +
              localStorage.getItem("lastName")
            }
            isOnline={datas.admin.isOnline}
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
  const [storyID, setStoryID] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    storyDatas && setStoryID(storyDatas.length + 1);
  }, []);

  const handleStorySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append('caption', caption)
    formData.append("id", storyID);
    formData.append("image", photo);

    axios
      .post("http://localhost:3001/story-uploads", formData)
      .then((res) => {
        console.log("Uploaded sucessfully ");
        navigate("/");
        getStoryData();
      })
      .catch((err) => {
        console.log("some error ocurred");
      });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    const imgFile = e.target.files[0];
    const imgURL = URL.createObjectURL(imgFile);
    setImageSRC(imgURL);
  };
  return (
    <form className="story-upload-container">
      <div className="story-cards">
        <div
          className="create-photo"
          onClick={() => fileInputRef.current.click()}
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
