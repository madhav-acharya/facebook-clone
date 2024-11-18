import React from 'react'
import '../styles/PageStructure.css'
import { RiSettings5Fill } from "react-icons/ri";
import { BiMessageSquareEdit } from "react-icons/bi";
import { SearchBar } from './NavBar';
import { FaSearch } from 'react-icons/fa';

export const PageStructure = ({pageSideBar}) => {
  return (
    <div className="page-structure">
      {pageSideBar }
      <NewMessage />
    </div>
  )
}

export const PageSideBar = ({pageName, pageBarLinks, onlyLinks, nameLess}) =>
{
  return(
    <div className="page-side-bar">
      {!nameLess&&<PageTitle pageName={pageName}/>}
      {!onlyLinks&&<SearchBarIcon pageName={pageName}/>}
      {pageBarLinks}
    </div>
  )
}
  
export const PageTitle = ({pageName}) =>
    {
      return(
        <div className="pages-title">
          <span className="page-title">{pageName}</span>
          <ProperIcon icon={<RiSettings5Fill />}/>
        </div>
      )
    }

export const ProperIcon = ({icon}) =>
    {
        return(
        <div className="proper-icon">
            {icon}
        </div>
          )
    }

    export const NewMessage = () =>
        {
            return(
            <div className="new-message">
                <ProperIcon icon={<BiMessageSquareEdit />}/>
            </div>
              )
        }
export const SearchBarIcon = ({pageName}) =>
    {
        return(
        <div className="searchbar-icon">
            <i className='search-icon' ><FaSearch /></i>
            <SearchBar widths = {'99%'} heights={'40px'} fontsize={'1rem'} placeholder={`Search ${pageName}`}/>
         </div>
            )
    }

    export const PageBarLink = ({linkName, linkIcon, photo}) => {
        return (
          <div className="page-bar-link">
            <ProperIcon icon={linkIcon}/>
            <span className="link-name">{linkName}</span>


          </div>
        )
      }