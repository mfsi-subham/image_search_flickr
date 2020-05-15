import React from 'react';
import Navbar from '../src/components/navbar'
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import Favourites from '../src/components/favourites'


const  App = props => {

  let routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/favourites" component={Favourites}/>
        <Route path="/" component={Navbar}/>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );

  return (

    <div>
      <Navbar/>
      {routes}
    </div>
  );
};

export default App;
