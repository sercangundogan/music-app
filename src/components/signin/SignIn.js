import React, {useState, useEffect} from "react"
import { useFirebase } from "react-redux-firebase"
import { withRouter, Link } from "react-router-dom"
import { useSelector } from "react-redux"

const SignIn = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")

    const firebase = useFirebase()
    const profile = useSelector(state => state.firebase.auth)
    const {isEmpty, isLoaded} = profile
    
    const redirectHome = () => (props.history.push("/"))
    
    async function handleSubmit (event) {
        event.preventDefault()

        const credentials = {email, password}
        isEmpty && isLoaded 
        ?   await firebase.login(credentials).then(() => alert("Signed Successfull")).catch(err => setAuthError(err.message))
        :   setAuthError("You have already signed in")
        if(isEmpty === false && isLoaded){
            props.history.push("/")
        } 
    }
    
    return (
        <div className="login">
            {authError && <div className="login-error">{authError}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-inputs">
                    <input name="email" type="email" className="email-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                    <input name="password" type="password" className="password-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input> 
                </div>
                <button type="submit">Login</button>
                <div className="no-account">
                    <Link to="/register">You can register here!</Link>
                </div>
            </form>
            
        </div>
    )
}

export default withRouter(SignIn)