import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

import './css/style.scss';

import AOS from 'aos';
import { focusHandling } from 'cruip-js-toolkit';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';

import Profile from './pages/Profile';

function App({ currentUser }) {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signin" render={() => 
          currentUser && currentUser.id ? (
            <Redirect to={`profile/${currentUser.id}`} />
          ) : (
            <SignIn />
          )
        }/>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/profile/:id" render={() => 
          currentUser && currentUser.id ? (
            <Profile />
          ): (
            <Redirect to='/' />
          )
        } />
      </Switch>
    </>
  );
};

const mapStateToProps = createStructuredSelector(
  {
      currentUser: selectCurrentUser
  }
);

export default connect(mapStateToProps, null)(App);
