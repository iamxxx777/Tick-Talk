import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/authContext';
import ProfileNav from '../../components/ProfileNav/ProfileNav';

import "./Profile.css"

const Profile = () => {

    const { currentUser } = useAuth();
    const [user, setUser] = useState({});

    useEffect(() => {
        async function getUser() {
            const { data } = await axios.get(`/api/profile/${currentUser.uid}`);
            setUser(data);
        }

        getUser();
    }, [currentUser.uid]);

    return (
        <div className="profile-page">
            <ProfileNav />

            <main className="prof">
                    <section className="profile">
                        <h1>Personal Info</h1>
                        <h3>Basic info, like your name and photo</h3>

                        <div className="profile_info">
                            <div className="info_head">
                                <div className="left">
                                    <h2>Profile</h2>
                                    <h4>Some info may be visible to other people</h4>
                                </div>
                                <div className="right">
                                    <Link to="/edit">
                                        <button>Edit</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="info">
                                <div className="left">
                                    <h2>Photo</h2>
                                </div>
                                <div className="right">
                                    <img src={user.photo} alt={user.name} />
                                </div>
                            </div>
                            <div className="info">
                                <div className="left">
                                    <h2>Name</h2>
                                </div>
                                <div className="right">
                                    <h5>{user.name}</h5>
                                </div>
                            </div>
                            <div className="info">
                                <div className="left">
                                    <h2>Bio</h2>
                                </div>
                                <div className="right">
                                    <h5>{user.bio || "Not specified"}</h5>
                                </div>
                            </div>
                            <div className="info">
                                <div className="left">
                                    <h2>Email</h2>
                                </div>
                                <div className="right">
                                    <h5>{user.email}</h5>
                                </div>
                            </div>
                            <div className="info">
                                <div className="left">
                                    <h2>Phone</h2>
                                </div>
                                <div className="right">
                                    <h5>{user.phone || "Not Specified"}</h5>
                                </div>
                            </div>
                            <div className="info">
                                <div className="left">
                                    <h2>Password</h2>
                                </div>
                                <div className="right">
                                    <h5>*********</h5>
                                </div>
                            </div>
                        </div>
                    </section>
            </main>
        </div>
    )
}

export default Profile
