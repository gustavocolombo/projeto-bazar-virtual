import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';

import CreateSale from './pages/CreateSale';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Routes = () => {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Route component ={Home} path="/" exact = {true} />
      <Route component = {CreateSale} path = "/create-sale" />
    </BrowserRouter>
  );
}

export default Routes;  