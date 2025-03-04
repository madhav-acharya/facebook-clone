import React, { useState } from "react";
import "../styles/Home.css";
import { NavBar, BelowNav } from "../components/NavBar";
import { Post } from "../components/Post";
import { Stories } from "../components/Story";
import { LeftBar, RightBar } from "../components/SideBar";
import { NewMessage } from "../components/PageStructure";
import { SideOverlay } from "../components/SideOverlay";

const Home = () => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>
      {
        <div className="home-page">
          <NavBar setShowMessage={setShowMessage} showMessage={showMessage} />
          <div className="main">
            <LeftBar />
            <div className="feed">
              <BelowNav />
              <Stories />
              {showMessage && <SideOverlay />}
              <NewMessage />
              <Post />
            </div>

            <RightBar />
          </div>
          <NewMessage />
        </div>
      }
    </>
  );
};

export default Home;
