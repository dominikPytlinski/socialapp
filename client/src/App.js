import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserData } from './redux/actions/userActions';
import Loading from './components/Loading';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const App = ({ getUserData, UI }) => {
  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    console.log('auth')
    if(auth) getUserData(JSON.parse(auth));
  }, [getUserData]);

  return (
    <Fragment>
        <BrowserRouter>
          {UI.loading ? (
            <div className="curtain"><Loading /></div>
          ) : (
            <Fragment>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </Fragment>
          )}
        </BrowserRouter>
    </Fragment>
  )
}

App.propTypes = {
  UI: PropTypes.object.isRequired
}

const mapstateToProps = state => ({
  UI: state.UI
});

export default connect(mapstateToProps, { getUserData })(App);