import React, { useEffect, useState } from "react";
import "../styles/NavBar.css";
import { IoIosArrowDown } from "react-icons/io";
import { Uploads } from "./Uploads";
import { PageBarLink } from "../components/PageStructure";
import { RiHome6Fill } from "react-icons/ri";
import { PiMonitorPlayFill } from "react-icons/pi";
import { BsShop } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi2";
import { RiGamepadLine } from "react-icons/ri";
import { RiLiveFill } from "react-icons/ri";
import { FaPhotoFilm } from "react-icons/fa6";
import { BiMoviePlay, BiSolidMoviePlay } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { BiLogoMessenger } from "react-icons/bi";
import { RiNotification2Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { SideOverlay } from "../components/SideOverlay";
import { PageSideBar } from "../components/PageStructure";
import { BarLink } from "../components/SideBar";
import { RiSettings5Fill } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { RiDoorOpenFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { HiBookOpen } from "react-icons/hi";
import useAppContext from "../hooks/useAppContext";
import Skeleton from "./Skeleton";

const uploadIcons = [
  <RiLiveFill color="#F02848" />,
  <FaPhotoFilm color="#44BD62" />,
  <BiSolidMoviePlay color="#FB5577" />,
];

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="nav">
        <LeftNav isMainNav={true} />
        <NavLinks />
        <RightNav />
      </div>
    </div>
  );
};

export const NavLinks = () => {
  return (
    <div className="nav-links-container">
      <nav className="nav-links">
        {
          <>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "active-nav nav-link home" : "nav-link home"
              }
            >
              <li className="nav-icons">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212S22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381c-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2s-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823M11.25 18a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </li>
            </NavLink>
            <NavLink
              to={"/watch"}
              className={({ isActive }) =>
                isActive ? "active-nav nav-link watch" : "nav-link watch"
              }
            >
              <li className="nav-icons">
                <PiMonitorPlayFill />
              </li>
            </NavLink>
            <NavLink
              to={"/marketplace"}
              className={({ isActive }) =>
                isActive
                  ? "active-nav nav-link marketplace"
                  : "nav-link marketplace"
              }
            >
              <li className="nav-icons">
                <BsShop />
              </li>
            </NavLink>
            <NavLink
              to={"/groups"}
              className={({ isActive }) =>
                isActive ? "active-nav nav-link groups" : "nav-link groups"
              }
            >
              <li className="nav-icons">
                <HiUserGroup />
              </li>
            </NavLink>
            <NavLink
              to={"/gaming"}
              className={({ isActive }) =>
                isActive ? "active-nav nav-link gaming" : "nav-link gaming"
              }
            >
              <li className="nav-icons">
                <RiGamepadLine />
              </li>
            </NavLink>
          </>
        }
      </nav>
    </div>
  );
};

export const LeftNav = ({ isMainNav }) => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="leftNav" onClick={() => navigate("/")}>
      <Profile profiles={"/images/fb-logo.png"} />
      {isMainNav && (
        <div className="nav-search">
          <i
            className="search-icon"
            onClick={() => setShowSearch(true)}
            onDoubleClick={() => setShowSearch(false)}
          >
            <FaSearch />
          </i>
          {showSearch && (
            <div className="temp-search">
              <SearchBar
                widths={"90%"}
                heights={"40px"}
                fontsize={"1rem"}
                placeholder={"Search Facebook"}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const RightNav = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { setIsLive, setIsPost, setIsReel, setUploadPopup, currentUserDatas} = useAppContext();

  if (!currentUserDatas) {
    return <Skeleton />;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="rightNav">
        <i
          className="menu-icon"
          onClick={() => {
            showMenu ? setShowMenu(false) : setShowMenu(true);
            setShowMessage(false);
            setShowSetting(false);
            setShowNotification(false);
          }}
        >
          <CgMenuGridR />
        </i>
        <i
          className="messanger-icon"
          onClick={() => {
            showMessage ? setShowMessage(false) : setShowMessage(true);
            setShowMenu(false);
            setShowSetting(false);
            setShowNotification(false);
          }}
        >
          <BiLogoMessenger />
        </i>
        <i className="notification-icon" onClick={() => {
            showNotification ? setShowNotification(false) : setShowNotification(true);
            setShowMenu(false);
            setShowSetting(false);
            setShowMessage(false);
          }}>
          <RiNotification2Fill />
        </i>
        <div
          className="pro-profile"
          onClick={() => {
            showSetting ? setShowSetting(false) : setShowSetting(true);
            setShowMenu(false);
            setShowMessage(false);
            setShowNotification(false);
          }}
        >
          <Profile profile={currentUserDatas?.profilePicture} isAccount={true} _id={currentUserDatas?._id} name={`${currentUserDatas?.firstName} ${currentUserDatas?.lastName}`}/>
        </div>
      </div>
      <div className="acc-sett">
        {/* menu */}
        {showMenu && (
          <div className="side">
            <SideOverlay
              content={
                <PageSideBar
                  onlyLinks={true}
                  pageName={"Create"}
                  pageBarLinks={
                    <>
                      <div
                        onClick={() => {
                          setUploadPopup(true);
                          setIsLive(false);
                          setIsPost(true);
                          setIsReel(false);
                        }}
                      >
                        <PageBarLink
                          linkName={"Post"}
                          linkIcon={<FaPenToSquare />}
                        />
                      </div>
                      <div>
                        <PageBarLink
                          linkName={"Story"}
                          linkIcon={<HiBookOpen />}
                        />
                      </div>
                      <div
                        className="h-border"
                        onClick={() => {
                          setUploadPopup(true);
                          setIsLive(false);
                          setIsPost(false);
                          setIsReel(true);
                        }}
                      >
                        <PageBarLink
                          linkName={"Reels"}
                          linkIcon={<BiMoviePlay />}
                        />
                      </div>
                      <div className="shortcut">
                        <span>Shortcut</span>
                      </div>
                      <div onClick={() => navigate("/")}>
                        <PageBarLink
                          linkName={"Home"}
                          linkIcon={<RiHome6Fill />}
                        />
                      </div>
                      <div onClick={() => navigate("/watch")}>
                        <PageBarLink
                          linkName={"Watch"}
                          linkIcon={<PiMonitorPlayFill />}
                        />
                      </div>
                      <div onClick={() => navigate("/marketplace")}>
                        <PageBarLink
                          linkName={"Marketplace"}
                          linkIcon={<BsShop />}
                        />
                      </div>
                      <div onClick={() => navigate("/groups")}>
                        <PageBarLink
                          linkName={"Groups"}
                          linkIcon={<HiUserGroup />}
                        />
                      </div>
                      <div onClick={() => navigate("/gaming")}>
                        <PageBarLink
                          linkName={"Gaming"}
                          linkIcon={<RiGamepadLine />}
                        />
                      </div>
                    </>
                  }
                />
              }
            />
          </div>
        )}

        {/* profile */}
        {showSetting && (
          <SideOverlay
            content={
              <PageSideBar
                onlyLinks={true}
                nameLess={true}
                pageName={"profile"}
                pageBarLinks={
                  <>
                    {" "}
                    <BarLink
                      photo={currentUserDatas?.profilePicture}
                      name={
                        `${currentUserDatas?.firstName} ${currentUserDatas?.lastName}`
                      }
                      isOnline={true}
                    />{" "}
                    <PageBarLink
                      linkName={"Settings and privacy"}
                      linkIcon={<RiSettings5Fill />}
                    />{" "}
                    <PageBarLink
                      linkName={"Help and support"}
                      linkIcon={<IoMdHelpCircle />}
                    />{" "}
                    <PageBarLink
                      linkName={"Display and accessibility"}
                      linkIcon={<IoMdMoon />}
                    />{" "}
                    <PageBarLink
                      linkName={"Give feedback"}
                      linkIcon={<MdFeedback />}
                    />{" "}
                    <div className="log-out" onClick={handleLogout}>
                      {" "}
                      <PageBarLink
                        linkName={"Log out"}
                        linkIcon={<RiDoorOpenFill />}
                      />{" "}
                    </div>{" "}
                  </>
                }
              />
            }
          />
        )}

        {/* chats */}
        {showMessage && (
          <SideOverlay
            content={
              <PageSideBar
                pageName={"Chats"}
                pageBarLinks={
                  <>
                    <BarLink
                      photo={"./images/blank-profile.webp"}
                      name={"Kushal Shrestha"}
                      isPost={true}
                      msg={"this is message"}
                      time={"1d"}
                      isOnline={true}
                    />{" "}
                  </>
                }
              />
            }
          />
        )}

        {/* notifiaction */}
        {showNotification && (
          <SideOverlay
            content={
              <PageSideBar
                pageName={"Notifications"}
                onlyLinks={true}
                pageBarLinks={
                  <>
                    <BarLink
                      photo={"./images/blank-profile.webp"}
                      name={"Kushal Shrestha"}
                      isPost={true}
                      msg={"this is the notification message"}
                      time={"1d"}
                      isOnline={true}
                    />{" "}
                  </>
                }
              />
            }
          />
        )}
      </div>
    </>
  );
};

export function Profile({ profile, profiles, isStory, isOnline, isAccount, _id, name }) {
  return (
    <div className="profile" >
      <NavLink to={`/${name}/${_id}`}>
        <img
          src={
            profile
              ? (profile.startsWith('/uploads')
                  ? `https://facebook-clone-backendd.onrender.com${profile}`
                  : profile)
              : profiles
          }
          
          className={`${isStory ? "profile-pic for-story" : "profile-pic"}`}
          alt={"profile"}
        />
      </NavLink>
      {isOnline ? (
        <div className="online"></div>
      ) : (
        isAccount && <div className="account">{<IoIosArrowDown />}</div>
      )}
    </div>
  );
}

export function SearchBar({ widths, heights, fontsize, placeholder }) {
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder={placeholder}
        style={{ width: widths, height: heights, fontSize: fontsize }}
        className="searchBar-input"
      />
    </div>
  );
}

export const Upload = () => {
  const {
    isLive,
    setIsLive,
    isPost,
    setIsPost,
    isReel,
    setIsReel,
    uploadPopup,
    setUploadPopup,
  } = useAppContext();

  return (
    <div className="upload">
      <ul className="uploadIcons">
        <li
          onClick={() => {
            setUploadPopup(true);
            setIsLive(true);
            setIsPost(false);
            setIsReel(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#F02848"
              d="M22.525 7.149a1 1 0 0 0-.972-.044L19 8.382V8c0-1.654-1.346-3-3-3H5C3.346 5 2 6.346 2 8v8c0 1.654 1.346 3 3 3h11c1.654 0 3-1.346 3-3v-.382l2.553 1.276a.99.99 0 0 0 .972-.043c.295-.183.475-.504.475-.851V8c0-.347-.18-.668-.475-.851M7 13.5a1.5 1.5 0 1 1-.001-2.999A1.5 1.5 0 0 1 7 13.5"
            ></path>
          </svg>
          <span>Live Video</span>
        </li>
        <li
          onClick={() => {
            setUploadPopup(true);
            setIsLive(false);
            setIsPost(true);
            setIsReel(false);
          }}
        >
          <FaPhotoFilm color="#44BD62" />
          <span>Photo/Video</span>
        </li>
        <li
          onClick={() => {
            setUploadPopup(true);
            setIsLive(false);
            setIsPost(false);
            setIsReel(true);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#FB5577"
              d="M12 2c1.845 0 3.33 0 4.54.088L13.1 7.25H8.4L11.9 2zM3.464 3.464c1.253-1.252 3.158-1.433 6.632-1.46L6.599 7.25H2.104c.147-1.764.503-2.928 1.36-3.786"
            ></path>
            <path
              fill="#FB5577"
              fillRule="evenodd"
              d="M2 12c0-1.237 0-2.311.026-3.25h19.948C22 9.689 22 10.763 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12m11.014.585C14.338 13.44 15 13.867 15 14.5s-.662 1.06-1.986 1.915c-1.342.866-2.013 1.299-2.514.98c-.5-.317-.5-1.176-.5-2.895s0-2.578.5-2.896s1.172.115 2.514.981"
              clipRule="evenodd"
            ></path>
            <path
              fill="#FB5577"
              d="M21.896 7.25c-.147-1.764-.503-2.928-1.36-3.786c-.598-.597-1.344-.95-2.337-1.16L14.9 7.25z"
            ></path>
          </svg>
          <span>Reel</span>
        </li>
      </ul>
      {uploadPopup && (
        <Uploads isLive={isLive} isPost={isPost} isReel={isReel} />
      )}
    </div>
  );
};

export const BelowNav = () => {
  const {currentUserDatas} = useAppContext();
  return (
    <div className="below-nav">
      <div className="search-profile">
        <Profile
          profile={currentUserDatas?.profilePicture}
          isStory={false}
          isOnline={true}
          _id={currentUserDatas?._id}
        />
        <SearchBar
          widths={"99%"}
          heights={"40px"}
          fontsize={".8rem"}
          placeholder={`What's on your mind, ${currentUserDatas?.firstName}?`}
        />
      </div>
      <Upload uploadIcons={uploadIcons} />
    </div>
  );
};
