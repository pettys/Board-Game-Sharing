import React, { Component } from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav/Nav';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../Pages/UserPage/UserPage';
import HomePage from '../Pages/HomePage/HomePage';
import LoggedOutUser from '../Pages/LoggedOutUserProfilePage/LoggedOutUserPage';
import SearchPage from '../Pages/SearchPageGames/SearchPageGames';
import UsersSearchPage from '../Pages/SearchPageUsers/SearchPageUsers';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
  }

  render() {
    return (
      <Router>
        <>
          <Nav />
          <Switch>
            <Redirect exact path='/' to='/home' />
            {/* Public routes always available to search. */}
            <Route
              exact
              path='/search/games'
              component={SearchPage}
            />
            <Route
              exact
              path='/search/users'
              component={UsersSearchPage}
            />
            {/* Show a user's profile (blocked if their profile is private.) */}
            <Route
              exact
              path='/user/:userName'
              component={LoggedOutUser}
            />
            <Route
              exact
              path='/home'
              component={HomePage}
            />
            {/* Protected routes only available when the user is logged in. */}
            <ProtectedRoute
              exact
              path='/dashboard'
              component={UserPage}
              viewMode='games'
            />
            <ProtectedRoute
              exact
              path='/friends'
              component={UserPage}
              viewMode='friends'
            />
            <ProtectedRoute
              exact
              path='/settings'
              component={UserPage}
              viewMode='settings'
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </>
      </Router>
    );
  }
}

const mapStateToProps = reduxState => ({
  userID: reduxState.user.userAttributes.user_id
});

export default connect(mapStateToProps)(App);
