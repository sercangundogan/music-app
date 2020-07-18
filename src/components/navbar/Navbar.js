import React from "react"
import { useFirebase } from "react-redux-firebase"
import { useSelector } from "react-redux"

export const Navbar = () => {
    const firebase = useFirebase()
    const isEmpty = useSelector(state => state.firebase.auth.isEmpty)
    const isLoaded = useSelector(state => state.firebase.auth.isLoaded)
    const profile = useSelector(state => state.firebase.profile)
    
    const signOut = () => {
        firebase.logout()
    }
    return (
        <div className="navbar">
            <div className="company">
                <div className="logo">
                    <i className="fas fa-music"></i>
                </div>
                <div className="brand">
                    <a href="/">Sercan Gündoğan</a>
                </div>
            </div>
            {isEmpty === false && isLoaded === true &&
            <div className="user">
                <div className="user-icon">
                    <i className="fas fa-smile-beam"></i>
                </div>
                {profile.isLoaded && 
                <div className="user-name">
                    {profile.name}
                </div>}
                
            </div>
            }   
            <div className="navbar-links">
                <div>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
                {isEmpty === false && isLoaded === true && <div>
                <a href="/" onClick={signOut}>Sign Out</a>
                </div>}
                {isEmpty === true && isLoaded ===true && <div>
                <a href="/login">Sign In</a>
                </div>}
            </div>
        </div>
    )
}