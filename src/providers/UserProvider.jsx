import React, { Component, createContext } from 'react'
import { auth, createUserProfileDocument } from '../firebase.js'

export const UserContext = createContext({ user: null })

class UserProvider extends Component {
    state = {
        user: null
    };

    unsuscribeFromAuth = null

    componentDidMount = async () => {
        this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            const user = await createUserProfileDocument(userAuth)
            console.log(user)
            this.setState({ user })
        })
    }

    componentWillUnmount = () => {
        this.unsuscribeFromAuth()
    }

    render() {
        const { user } = this.state
        const { children } = this.props
        return (
            <UserContext.Provider value={user}>{children}</UserContext.Provider>
        )
    }
}

export default UserProvider