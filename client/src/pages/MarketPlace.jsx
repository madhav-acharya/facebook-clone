import React from 'react';
import '../styles/MarketPlace.css';
import {PageStructure, PageSideBar, PageBarLink} from '../components/PageStructure';
import { BsShop } from "react-icons/bs";
import { TbBellRingingFilled } from "react-icons/tb";
import { FaInbox } from "react-icons/fa6";
import { SiBuymeacoffee } from "react-icons/si";
import { MdSell } from "react-icons/md";

export const MarketPlace = () => {
  return (
    <div className="marketplace">
      <PageStructure 
        pageSideBar = {<PageSideBar pageName={"MarketPlace"} pageBarLinks={<MarketPlaceLinks />}/>}/>
      <MarketPlaceContent />
    </div>
  )
}

export const MarketPlaceLinks = () => {
  return (
    <div className="marketplace-links">
      <PageBarLink linkName={"Browse All"} linkIcon={<BsShop />}/> 
      <PageBarLink linkName={"Notifications"} linkIcon={<TbBellRingingFilled />}/>
      <PageBarLink linkName={"Inbox"} linkIcon={<FaInbox />}/>
      <PageBarLink linkName={"Buying"} linkIcon={<SiBuymeacoffee />}/>
      <PageBarLink linkName={"Selling"} linkIcon={<MdSell />}/>
    </div>
  )
}

export const MarketPlaceContent = () => {
  return (
    <div className="marketplace-content">

    </div>
  )
}
