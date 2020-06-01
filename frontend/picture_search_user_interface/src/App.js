import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import Navbar from '../src/components/navbar'
import Favourites from '../src/components/favourites'
import HomePageSearch from '../src/containers/homePageSearch'


const  App = props => {

  let routes = (
    
    <Switch>
      <Route path="/favourites" component={Favourites}/>
      <Route path="/" component={HomePageSearch}/>
      <Redirect to="/" />
    </Switch>
    
  );

  return (
    <div>      
      <Navbar/>
      {routes}
    </div>
  );
};

export default App;
