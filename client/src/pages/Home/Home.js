import React from 'react'
import { useAuth } from "../../contexts/authContext"

const Home = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <div>
            This is the home page
        </div>
    )
}

export default Home
