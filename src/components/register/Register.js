import React, {useState} from "react"
import {withRouter, Link} from "react-router-dom"
import { useFirebase } from "react-redux-firebase";

const Register = (props) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [authError, setAuthError] = useState("")

    const firebase = useFirebase()
    

    const updateProfile = () => {
        firebase.updateProfile({name: fullname})
        return props.history.push("/")
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {email, password, fullname}
        if(confirmPassword === password){
            firebase.createUser(credentials, )
            .then(() => updateProfile())
            .catch((err) => setAuthError(err.message))
            
        }
        else {
            setPassword("")
            setconfirmPassword("")

            alert("Passwords are not equal")    
        }   
        
        
    }

    return (
        <div className="register">
            {authError && <div className="register-error">{authError}</div>}
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-inputs">
                    <input name="fullname" type="text" className="fullname-input" placeholder="Name" onChange={(e) => setFullname(e.target.value)}></input>
                    <input name="email" type="email" className="email-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input> 
                    <div className="register-passwords">
                        <input name="password" type="password" className="password-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input> 
                        <input name="confirm-password" type="password" className="confirmpassword-input" placeholder="Confirm" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword}></input>
                    </div>
                   
                </div>
                <button type="submit">Register</button>
                <div className="has-account">
                    <Link to="/login">You already have account?</Link>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Register)