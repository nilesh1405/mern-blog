import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button } from 'flowbite-react';
import { updateUserProfile } from '../redux/user/userSlice';  // Import your update action (Redux action)
import { CircularProgressbar } from 'react-circular-progressbar';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const filePickerRef = useRef();

  const CLOUD_NAME = 'drc443m7l'; // Your Cloudinary cloud name
  const UPLOAD_PRESET = 'mern-blog'; // Use the preset name you created

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file)); // Preview image before upload
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('file', imageFile); // Add the file
    formData.append('upload_preset', UPLOAD_PRESET); // Add upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            // Calculate the percentage of the uploaded file
            if (progressEvent.total) {
              const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              
              // Ensure smooth progress update, avoiding the jump to 100% before completion
              if (percentage < 100) {
                setUploadProgress(percentage);
              } else if (percentage === 100) {
                setUploadProgress(100); // Set to 100% when upload completes
              }
              console.log(`Upload Progress: ${percentage}%`);
            }
          },
        }
      );

      const data = response.data;
      console.log('Response from Cloudinary:', data);

      if (data.secure_url) {
        console.log('Uploaded successfully:', data.secure_url);
        return data.secure_url; // Return the uploaded image URL
      } else {
        console.error('Error uploading image:', data.error.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage(); // Upload image and get the URL
    if (imageUrl) {
      // Dispatch the action to update the user profile with the new image URL
      dispatch(updateUserProfile({ ...currentUser, profilePicture: imageUrl }));
      console.log('Profile updated with image URL:', imageUrl);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
            {uploadProgress >= 0 && uploadProgress < 100 && (
              <CircularProgressbar 
                value={uploadProgress} 
                text={`${uploadProgress}%`} 
                strokeWidth={5}
                styles={{
                  root: {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  },
                  path: {
                    stroke: '#4F46E5',
                  },
                }} 
              />
            )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[lightgray] object-cover"
          />
        </div>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default DashProfile;
