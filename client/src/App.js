import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
//Redux
import { useSelector, useDispatch } from 'react-redux';
import { SET_USER, CLEAR_USER, STOP_LOADING_USER } from './redux/types';
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

  if(!user.logged) {
    const auth = JSON.parse(sessionStorage.getItem('auth'));
    if(auth) {
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
          })
          console.log(err.response);
        })
    } else if(user.loadingLogged) {
      dispatch({
        type: STOP_LOADING_USER
      })
    }
  }

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
            {user.loadingLogged ? (
              <div className="curtain"><Loading /></div>
            ) : (
              <Fragment>
                <Header logout={logoutUser} />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route exact path="/users/:nickName/posts/:postId" component={Home} />
                </Switch>
              </Fragment>
            )}
          </BrowserRouter>
        </MuiThemeProvider>
    </Fragment>
  )
}

export default App;