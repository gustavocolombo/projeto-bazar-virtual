import React from 'react';
import './App.css';
import Routes from './routes';
import { Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes/>
    </>
  );
}


export default App;
