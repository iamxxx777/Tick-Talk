import React, { useContext, useState, useEffect } from "react"
import io from "socket.io-client"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const socket = io({autoConnect: false});

  const basicSignup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  const basicSignin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const updateDetails = (displayName, photoURL) => {
    return auth.currentUser.updateProfile({displayName, photoURL});
  }

  const updatePhoto = (photoURL) => {
    return auth.currentUser.updateProfile({photoURL});
  }

  const updateName = (displayName) => {
    return auth.currentUser.updateProfile({displayName});
  }

  const providerSignIn = (provider) => {
      return auth.signInWithPopup(provider)
  }

  const logout = () => {
    return auth.signOut()
  }

//   const resetPassword = (email) => {
//     return auth.sendPasswordResetEmail(email)
//   }

   const updateEmail = (email) => {
    return currentUser.updateEmail(email)
   }

   const updatePassword = (password) => {
    return currentUser.updatePassword(password)
   }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    socket,
    basicSignin,
    basicSignup,
    logout,
    providerSignIn,
    updateDetails,
    updateEmail,
    updatePassword,
    updatePhoto,
    updateName
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}