import React, { Component } from 'react'

import Post from './Post'
import Comments from './Comments'
import { firestore } from '../firebase'
import { collectIdsAndDocs } from '../utilities'

import { withRouter } from 'react-router-dom'
import withUser from './withUser'

class PostPage extends Component {
    state = { post: null, comments: [] }

    get postId() {
        return this.props.match.params.id
    }

    get postRef() {
        return firestore.doc(`posts/${this.postId}`)
    }

    get commentsRef() {
        return this.postRef.collection('comments')
    }

    unsuscribeFromPost = null
    unsuscribeFromComments = null

    componentDidMount = async () => {
        this.unsuscribeFromPost = this.postRef.onSnapshot(snapshot => {
            const post = collectIdsAndDocs(snapshot)
            this.setState({ post })
        })

        this.unsuscribeFromComments = this.commentsRef.onSnapshot(snapshot => {
            const comments = snapshot.docs.map(collectIdsAndDocs)
            this.setState({ comments })
        })
    }

    componentWillUnmount = () => {
        this.unsuscribeFromPost()
        this.unsuscribeFromComments()
    }

    createComment = (comment) => {
        const { user } = this.props
        this.commentsRef.add({
            ...comment,
            user
        })
    }

    render() {
        const { post, comments } = this.state
        return (
            <section>
                {post && <Post {...post} />}
                <Comments
                    comments={comments}
                    onCreate={this.createComment}
                />
            </section>
        )
        return <div>Post Page</div>
    }
}

export default withRouter(withUser(PostPage))