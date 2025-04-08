import React, { useEffect, useState } from 'react';
import { useSidebar } from '../contexts/SidebarContext';
import ProfileImage from '../assets/person-icon.png';

const Profile = ({ handleLogout }) => {
    const { userInfo, loading, error, updateSidebarProps } = useSidebar();
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        profilePicture: null,
    });

    useEffect(() => {
        if (userInfo) {
            setProfileData(userInfo);
            setFormData({
                name: userInfo.name || '',
                email: userInfo.email || '',
                profilePicture: userInfo.profilePicture || null,
            });
        } else {
            setFormData({
                name: '',
                email: '',
                profilePicture: null,
            });
        }

        if (!userInfo) {
            fetch('/api/user/profile')
                .then((res) => res.json())
                .then((data) => {
                    setProfileData(data);
                    setFormData({
                        name: data.name || '',
                        email: data.email || '',
                        profilePicture: data.profilePicture || null,
                    });
                })
                .catch((err) => console.error('Error fetching profile data:', err));
        }
    }, [userInfo]);

    useEffect(() => {
        const newProps = {
            title: 'Profile',
            image: ProfileImage,
            titleClassName: 'cookingTitle',
            imageClassName: 'cookingImage',
        };
        if (updateSidebarProps) {
            updateSidebarProps(newProps);
        }
        return () => {
            if (updateSidebarProps) {
                updateSidebarProps({ title: '', image: '', titleClassName: '', imageClassName: '' });
            }
        };
    }, [updateSidebarProps]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevState) => ({
                ...prevState,
                profilePicture: URL.createObjectURL(file),
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProfile = {
                name: formData.name,
                email: formData.email,
                profilePicture: formData.profilePicture,
            };

            // Make a request to update the profile (mock API endpoint)
            const response = await fetch('/api/user/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                // Optionally refetch data to display updated information
                const updatedUserInfo = await response.json();
                setProfileData(updatedUserInfo);
                alert('Profile updated successfully!');
            } else {
                alert('Failed to update profile.');
            }
        } catch (err) {
            console.error('Error updating profile:', err);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="profile-container">
            <h2>Profile Page</h2>
            <div className="profile-details">
                <h3>{profileData ? `${profileData.name}'s Profile:` : "Guest's Profile:"}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="profile-info">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name-profile-input"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your name goes here"
                        />

                        <label htmlFor="email-profile-label">Email:</label>
                        <input
                            type="text"
                            id="email-profile-input"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="Your email goes here"
                        />

                        <div className="profile-picture-wrapper">
                            <label htmlFor="profilePicture">Profile Picture:</label>
                            <label htmlFor="profilePicture" className="custom-file-upload">
                                {formData.profilePicture ? 'Change Profile Picture' : 'Choose File'}
                            </label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
            <div className="profile-button-container logoutBtn">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
