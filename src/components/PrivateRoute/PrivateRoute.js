import React from "react"
import {useSelector} from "react-redux"
import {Route, Redirect} from "react-router-dom"
const PrivateRoute = ({ Component, ...rest }) => {
    const isEmpty = useSelector(state => state.firebase.auth.isEmpty)
    const isLoaded = useSelector(state => state.firebase.auth.isLoaded)
    return (
    <Route {...rest} render={props => !isLoaded ? <div className="loading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> : !isEmpty ? (
        <Component {...props} />
    ) : (
            <Redirect to={
                {
                    pathname: '/login',
                    state: {
                        form: props.location
                    }
                }} />
    )} />
    )
}

export default PrivateRoute