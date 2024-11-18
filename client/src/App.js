import './App.css';
import React, {useState, useEffect} from 'react';
import { NavBar } from './components/NavBar';
import Home from './pages/Home';
import {Watch} from './pages/Watch';
import {MarketPlace} from './pages/MarketPlace';
import {Groups} from './pages/Groups';
import {Gaming} from './pages/Gaming';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Navigate } from 'react-router-dom';
import { ActualOnclickPost, ActualOnclickStory } from './components/OnclickStructure';
import { OnclickCreateStory } from './components/OnclickStructure';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProfileView from './components/ProfileView';


function App() {
  const user = localStorage.getItem('firstName');
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);  
    }
  }, [user]);
  

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setIsAuthenticated={setIsAuthenticated}/>,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: isAuthenticated ? <Home /> : <Navigate to='/login' />,
    },
    {
      path: "/watch",
      element: isAuthenticated ? <div><NavBar /> <Watch /></div> : <Navigate to='/login' />,
    },
    {
      path: "/marketplace",
      element: isAuthenticated ? <div><NavBar /> <MarketPlace /></div> : <Navigate to='/login' />,
    },
    {
      path: "/groups",
      element: isAuthenticated ? <div><NavBar /> <Groups /></div> : <Navigate to='/login' />,
    },
    {
      path: "/gaming",
      element: isAuthenticated ? <div><NavBar /> <Gaming /></div> : <Navigate to='/login' />,
    },
    {
      path: "/stories",
      element: isAuthenticated ? <div> <ActualOnclickStory /></div> : <Navigate to='/login' />,
    },
    {
      path: "/posts",
      element: isAuthenticated ? <div><ActualOnclickPost /></div> : <Navigate to='/login' />,
    },
    {
      path: "/story/create",
      element: isAuthenticated ? <div><OnclickCreateStory /></div> : <Navigate to='/login' />,
    },
    {
      path: "/profile",
      element: isAuthenticated ? <div> <NavBar /> <ProfileView /></div> : <Navigate to='/login' />,
    }
  ]);
  
  return (
      <div className="app">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;
