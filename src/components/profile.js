import React from 'react';
import LogoutButton from './logout';

const Profile = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>; 
  }
  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <p><strong>User ID:</strong> {user._id}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Profile;