import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Singup from './Pages/Signup';
import Header from './Components/Header';
import './App.css';

class App extends Component {
  render()
  {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Singup} />
          </Switch>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
