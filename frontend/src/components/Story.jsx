import React, { useRef, useState } from "react";
import "../styles/Story.css";
import { Profile } from "./NavBar";
import { FaPlus } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import useAppContext from "../hooks/useAppContext";

export const Stories = () => {
  const [dimension, setDimension] = useState(200);
  const [opacityPrev, setOpacityPrev] = useState(0);
  const [opacityNext, setOpacityNext] = useState(1);
  const { storyDatas, currentUserDatas} = useAppContext();
  const cRef = useRef(null);
  const navigate = useNavigate();

  const nextStory = () => {
    setDimension(cRef.current.clientWidth);
    cRef.current.scrollBy({ left: dimension });
    setOpacityPrev(1);
    if (
      cRef.current.scrollLeft >
      cRef.current.scrollWidth - cRef.current.clientWidth
    ) {
      setOpacityNext(0);
    }
  };

  const prevStory = () => {
    setDimension(cRef.current.clientWidth);
    cRef.current.scrollBy({ left: -dimension });
    if (cRef.current.scrollLeft === 0) {
      setOpacityPrev(0);
    }
  };


  return (
    <div className="s-cont">
      <div className="story-container" ref={cRef}>
        <div
          className="story"
          style={{
            backgroundImage: `url(${currentUserDatas?.profilePicture})`,
          }}
        >
          {currentUserDatas && (
            <div
              className="own-story"
              onClick={() => navigate("/story/create")}
            >
              <img
                src={currentUserDatas.profilePicture}
                alt="Create Story"
                className="own-story-pic"
              />
              <div className="create-story">
                <span>Create Story</span>
              </div>
              <div className="plus-icon">
                <FaPlus />
              </div>
            </div>
          )}
        </div>

        {storyDatas ? (
          storyDatas.map((storyData, index) => (
            <div
              className="story"
              style={{ backgroundImage: `url(${storyData.image})` }}
              key={storyData._id}
            >
              <div
                className="ons"
                onClick={() => {
                  try {
                    navigate("/stories");
                  } catch (error) {
                    console.log("Error occurred");
                  }
                }}
              >
                <img
                  src={storyData.image}
                  alt={storyData.image}
                  className="story-pic"
                  onClick={ () => {localStorage.setItem("selectedStory", index);}}
                  
                />
                <div className="story-profile">
                  <Profile
                    profile={storyData.user.profilePicture}
                    isStory
                    isOnline={true}
                  />
                </div>
                <div className="story-name">
                  {storyData.user.firstName + " " + storyData.user.lastName}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}

        <div
          className="previous-button"
          onClick={prevStory}
          style={{ opacity: opacityPrev }}
        >
          <ConstructButton rawIcon={<GrPrevious />} />
        </div>
        <div
          className="next-button"
          onClick={nextStory}
          style={{ opacity: opacityNext }}
        >
          <ConstructButton rawIcon={<GrNext />} />
        </div>
      </div>
    </div>
  );
};

export const ConstructButton = ({ rawIcon }) => {
  return (
    <div className="construct-button">
      <i className="raw-icon">{rawIcon}</i>
    </div>
  );
};
