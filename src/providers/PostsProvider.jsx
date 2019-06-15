import React, { Component, createContext } from "react"
import { firestore } from '../firebase.js'
import { collectIdsAndDocs } from "../utilities.js"

export const PostsContext = createContext()

class PostsProvider extends Component {
    state = { posts: [] }

    unsuscribeFromFirestore = null

    componentDidMount = () => {
        this.unsuscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs)
            this.setState({ posts })
        })
    }

    componentWillUnmount = () => {
        this.unsuscribeFromFirestore()
    }

    render() {
        const { posts } = this.state
        const { children } = this.props

        return (
            <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
        )
    }
}

export default PostsProvider