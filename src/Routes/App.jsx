import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "../Components/Header"
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import PostListProvider from '../store/post-list-store';
import { Outlet } from 'react-router-dom';


function App() {

  const [selectedTab, setSelectedTab] = useState("Home");

  return (
      <PostListProvider>    
      <div className='app-container'>
      <Header/>
      <div className='content'>
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className='main-content'>
      <Outlet/>
      </div>
      </div>
      <Footer/>
      </div>
      </PostListProvider>
  );
};

export default App