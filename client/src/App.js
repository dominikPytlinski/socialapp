import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { LOADING_USER, SET_USER, STOP_LOADING_UI, CLEAR_USER, STOP_LOADING_USER } from './redux/types';
//MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
//Components
import Loading from './components/Loading';
import Header from './components/Header';
//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
//CSS
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    if(auth) {
      dispatch({
        type: LOADING_USER
      });
      axios.get(`http://localhost:4000/users/${auth.id}`)
        .then(res => {
          const data = {
            user: res.data.data
          }
          dispatch({
            type: SET_USER,
            payload: data
          });
          const authToken = `Bearer ${auth.token}`;
          axios.defaults.headers.common['Authorization'] = authToken;
        })
        .catch(err => {
          dispatch({
            type: STOP_LOADING_USER
          });
          console.log(err.response);
        })
    }
  }, [dispatch]);

  const logoutUser = () => {
    sessionStorage.removeItem('auth');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type: CLEAR_USER
    });
  }

  return (
    <Fragment>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            {user.loading ? (
              <div className="curtain"><Loading /></div>
            ) : (
              <Fragment>
                <Header logout={logoutUser} />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                </Switch>
              </Fragment>
            )}
          </BrowserRouter>
        </MuiThemeProvider>
    </Fragment>
  )
}

export default App;