import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { FaUser, FaStar } from 'react-icons/fa';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUser size={60} />
        </div>
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <div className="profile-rating">
            <FaStar color="#ffc107" />
            <span>{user?.rating || 5.0}</span>
          </div>
        </div>
      </div>

      <div className="profile-details">
        {isEditing ? (
          <>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="profile-actions">
              <Button onClick={handleSave} variant="primary">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <div className="profile-field">
              <label>Email:</label>
              <p>{user?.email}</p>
            </div>
            <div className="profile-field">
              <label>Phone:</label>
              <p>{user?.phone || 'Not provided'}</p>
            </div>
            <div className="profile-field">
              <label>Role:</label>
              <p>{user?.role || 'Rider'}</p>
            </div>
            <Button onClick={() => setIsEditing(true)} variant="primary">Edit Profile</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
