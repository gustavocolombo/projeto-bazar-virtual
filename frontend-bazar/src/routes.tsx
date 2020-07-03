import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';

import CreateSale from './pages/CreateSale';
import Home from './pages/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component ={Home} path="/" exact = {true} />
      <Route component = {CreateSale} path = "/create-sale" />
    </BrowserRouter>
  );
}

export default Routes;  