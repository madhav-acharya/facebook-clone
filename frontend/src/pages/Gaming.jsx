import React from 'react';
import '../styles/Gaming.css'
import {PageStructure, PageSideBar, PageBarLink} from '../components/PageStructure';
import { RiGamepadLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { TbBellRingingFilled } from "react-icons/tb";

export const Gaming = () => {
  return (
    <div className="gaming">
      <PageStructure 
        pageSideBar = {<PageSideBar pageName={"Gaming"} pageBarLinks={<GamingLinks />}/>}/>
        <GamingContent />
    </div>
  )
}

export const GamingLinks = () => {
  return (
    <div className="gaming-links">
      <PageBarLink linkName={"Play Games"} linkIcon={<RiGamepadLine />}/> 
      <PageBarLink linkName={"Gaming Activity"} linkIcon={<FaUserCircle />}/>
      <PageBarLink linkName={"Notifications"} linkIcon={<TbBellRingingFilled />}/>
    </div>
  )
}

export const GamingContent = () => {
  return (
    <div className="gaming-content">

    </div>
  )
}
