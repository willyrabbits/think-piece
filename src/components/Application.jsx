import React, { Component } from 'react';

import Posts from './Posts';
import Authentication from './Authentication';
import UserProfile from './UserProfile';

import { Switch, Route, Link } from 'react-router-dom'

class Application extends Component {

  render() {
    return (
      <main className="Application">
        <Link to='/'><h1>Think Piece</h1></Link>
        <Authentication />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route exact path="/profile" component={UserProfile} />
        </Switch>
      </main>
    );
  }
}

export default Application;
