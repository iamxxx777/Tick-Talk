import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

import "./user.css"

const User = () => {

    const [drop, setDrop] = useState(false);
    const { logout, currentUser } = useAuth();
    const history = useHistory();

    const signOut = async () => {
        await logout();
        history.push("login");
    }

    return (
        <div className="side-user">
            <div className="user">
                <div className="user_info">
                    <img src={currentUser.photoURL} alt="user" />

                    <div className="name">
                        <h3>{currentUser.displayName}</h3>
                    </div>
                </div>

                <div className="drop">
                    <button onClick={() => setDrop(!drop)} className={`${drop && "active"}`}><i className="fa fa-caret-down" aria-hidden="true"></i></button>
                        <div className={`dropdown ${drop && "drop-show"}`}>
                            <ul>
                                <li>
                                    <Link onClick={() => setDrop(false)} to="/profile"><div><i className="fa fa-user-circle" aria-hidden="true"></i> <p>My Profile</p></div></Link>
                                </li>
                                <li>
                                    <Link onClick={() => setDrop(false)} to="/"><div><i className="fa fa-users" aria-hidden="true"></i> <p>Group Chat</p></div></Link>
                                </li>
                                <hr />
                                <li className="logout">
                                    <button onClick={signOut}>
                                        <div>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i> 
                                            <p>Logout</p>
                                        </div>
                                    </button>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default User
