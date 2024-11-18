import React from 'react';
import '../styles/Groups.css'
import {PageStructure, PageSideBar, PageBarLink} from '../components/PageStructure';
import { FaNewspaper } from "react-icons/fa6";
import { FaCompass } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";

export const Groups = () => {
  return (
    <div className="groups">
      <PageStructure 
        pageSideBar = {<PageSideBar pageName={"Groups"} pageBarLinks={<GroupsLinks />}/>}/>
        <GroupsContent />
    </div>
  )
}

export const GroupsLinks = () => {
  return (
    <div className="groups-links">
      <PageBarLink linkName={"Your Feed"} linkIcon={<FaNewspaper />}/> 
      <PageBarLink linkName={"Discover"} linkIcon={<FaCompass />}/>
      <PageBarLink linkName={"Your groups"} linkIcon={<HiUserGroup />}/>
    </div>
  )
}

export const GroupsContent = () => {
  return (
    <div className="groups-content">

    </div>
  )
}
