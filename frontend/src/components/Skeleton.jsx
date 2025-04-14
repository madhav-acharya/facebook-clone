import React from 'react';
import '../styles/Skeleton.css';

const Skeleton = () => {
  return (
    <div className="skeleton-container">
      {/* Header Navigation */}
      <header className="skeleton-header">
        <div className="header-left">
          <div className="logo-placeholder pulse"></div>
          <div className="search-placeholder pulse"></div>
        </div>
        <div className="header-center">
          <div className="nav-item-placeholder pulse"></div>
          <div className="nav-item-placeholder pulse"></div>
          <div className="nav-item-placeholder pulse"></div>
          <div className="nav-item-placeholder pulse"></div>
          <div className="nav-item-placeholder pulse"></div>
        </div>
        <div className="header-right">
          <div className="icon-placeholder pulse"></div>
          <div className="icon-placeholder pulse"></div>
          <div className="icon-placeholder pulse"></div>
          <div className="profile-placeholder pulse"></div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="skeleton-main">
        {/* Left Sidebar */}
        <aside className="sidebar sidebar-left">
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
          <div className="sidebar-item pulse"></div>
        </aside>

        {/* News Feed */}
        <section className="content-feed">
          {/* Story Bar */}
          <div className="stories-container">
            <div className="story-placeholder pulse"></div>
            <div className="story-placeholder pulse"></div>
            <div className="story-placeholder pulse"></div>
            <div className="story-placeholder pulse"></div>
          </div>

          {/* Create Post */}
          <div className="create-post pulse"></div>

          {/* Posts */}
          <div className="post-placeholder pulse">
            <div className="post-header">
              <div className="avatar-placeholder pulse"></div>
              <div className="post-info pulse"></div>
            </div>
            <div className="post-content pulse"></div>
            <div className="post-image pulse"></div>
            <div className="post-actions pulse"></div>
          </div>

          <div className="post-placeholder pulse">
            <div className="post-header">
              <div className="avatar-placeholder pulse"></div>
              <div className="post-info pulse"></div>
            </div>
            <div className="post-content pulse"></div>
            <div className="post-image pulse"></div>
            <div className="post-actions pulse"></div>
          </div>

          <div className="post-placeholder pulse">
            <div className="post-header">
              <div className="avatar-placeholder pulse"></div>
              <div className="post-info pulse"></div>
            </div>
            <div className="post-content pulse"></div>
            <div className="post-actions pulse"></div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="sidebar sidebar-right">
          <div className="sidebar-header pulse"></div>
          <div className="contact-item pulse"></div>
          <div className="contact-item pulse"></div>
          <div className="contact-item pulse"></div>
          <div className="contact-item pulse"></div>
          <div className="contact-item pulse"></div>
          <div className="contact-item pulse"></div>
          <div className="contact-item pulse"></div>
        </aside>
      </main>
    </div>
  );
};

export default Skeleton;
