import React from 'react'
import Header from '../components/Header'
import UserProfileSettings from '../components/UserProfileSettings'

const UserProfile = () => {
  return (
    <div>
        <Header isLoggedIn={ true } />
        <UserProfileSettings />
    </div>
  )
}

export default UserProfile