import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Navbar} from "./components/navbar/Navbar"
import MusicList from "./components/musiclist/MusicList"
import Register from "./components/register/Register"
import SignIn from './components/signin/SignIn';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"



function App() {
  return (
    <div >
      <BrowserRouter>
      <Navbar />
      <Switch>
          <PrivateRoute exact path="/" Component={MusicList} ></PrivateRoute>   
          <Route exact path="/register" component={Register}></Route> 
          <Route exact path="/login" component={SignIn}></Route>
      </Switch>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
