import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/authContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth()

    return (
        <div>
            <Route
                {...rest}
                render={props => {
                    return currentUser ? <Component {...props} /> : <Redirect to="/login" />
                }}
            ></Route>
        </div>
    )
}

export default PrivateRoute
