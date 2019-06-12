import React, { Component } from 'react';

import { firestore, auth } from '../firebase'

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';

class Application extends Component {
  state = {
    posts: [],
    user: null
  };

  unsuscribeFromFirestore = null
  unsuscribeFromAuth = null

  componentDidMount = async () => {
    this.unsuscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs)
      this.setState({ posts })
    })

    this.unsuscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  componentWillUnmount = () => {
    this.unsuscribeFromFirestore()
  }

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
