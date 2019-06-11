import React, { Component } from 'react';

import { firestore } from '../firebase'

import Posts from './Posts';
import { collectIdsAndDocs } from '../utilities';

class Application extends Component {
  state = {
    posts: [],
  };

  unsuscribe = null

  componentDidMount = async () => {
    /*
    const snapshot = await firestore.collection('posts').get()
    const posts = snapshot.docs.map(collectIdsAndDocs)
    this.setState({ posts })
    */
    this.unsuscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs)
      this.setState({ posts })
    })
  }

  componentWillUnmount = () => {
    this.unsuscribe()
  }

  handleCreate = async post => {
    const { posts } = this.state
    const docRef = await firestore.collection('posts').add(post)
    const doc = await docRef.get()
    const newPost = collectIdsAndDocs(doc)
    this.setState({ posts: [newPost, ...posts] });
    //await firestore.collection('posts').add(post)
  };

  handleRemove = async id => {
    const allPosts = this.state.posts
    await firestore.doc(`posts/${id}`).delete()
    const posts = allPosts.filter(post => post.id !== id)
    this.setState({ posts })
    //firestore.doc(`posts/${id}`).delete()
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} onCreate={this.handleCreate} onRemove={this.handleRemove} />
      </main>
    );
  }
}

export default Application;
