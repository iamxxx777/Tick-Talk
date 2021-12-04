import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { AuthProvider } from "./contexts/authContext"

import './App.css';

import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login/Login"
import SignUp from "./pages/Signup/SignUp"
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import ChatScreen from "./pages/Chat/ChatsScreen";
import WelcomeScreen from "./pages/Welcome/WelcomeScreen";
import NotFound from "./pages/NotFound/NotFound"


function App() {

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={WelcomeScreen} />
            <PrivateRoute path="/edit" component={EditProfile} />
            <PrivateRoute path="/channels/:id" component={ChatScreen} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={SignUp} />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
