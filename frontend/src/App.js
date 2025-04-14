import './App.css';
import React, {useEffect, useState} from 'react';
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
import Skeleton from './components/Skeleton';

function App() {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      setLoading(true);
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (loading) {
    return (
      <div className="skeleton">
        <Skeleton />
      </div>
    );
  }

  const token = localStorage.getItem('token');

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: token ? <Home /> : <Navigate to='/login' />,
    },
    {
      path: "/watch",
      element: token ? <div><NavBar /> <Watch /></div> : <Navigate to='/login' />,
    },
    {
      path: "/marketplace",
      element: token ? <div><NavBar /> <MarketPlace /></div> : <Navigate to='/login' />,
    },
    {
      path: "/groups",
      element: token ? <div><NavBar /> <Groups /></div> : <Navigate to='/login' />,
    },
    {
      path: "/gaming",
      element: token ? <div><NavBar /> <Gaming /></div> : <Navigate to='/login' />,
    },
    {
      path: "/stories",
      element: token ? <div> <ActualOnclickStory /></div> : <Navigate to='/login' />,
    },
    {
      path: "/posts",
      element: token ? <div><ActualOnclickPost /></div> : <Navigate to='/login' />,
    },
    {
      path: "/story/create",
      element: token ? <div><OnclickCreateStory /></div> : <Navigate to='/login' />,
    },
    {
      path: "/:name/:id",
      element: token ? <div> <NavBar /> <ProfileView /></div> : <Navigate to='/login' />,
    }
  ]);
  
  return (
      <div className="app">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
  );
}

export default App;
