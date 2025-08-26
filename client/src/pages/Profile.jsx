import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const Profile = () => {
  const { authUser, isUploadingProfile, updateProfile } = useAuthStore();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      updateProfile({ profilePicture: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return <div className="h-screen pt-20">
    <div className="max-w-2xl mx-auto p-4 py-8">
      <div className="bg-base-300 rounded-xl p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Your Profile Information</p>
        </div>

        {/* avatar section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img src={authUser.profileImageURL ||"/avatar.png"} 
            alt="Profile Picture"
            className="size-32 rounded-full object-cover border-4" />
            <label 
            htmlFor="avatar-upload" 
            className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUploadingProfile?"animate-pulse pointer-events-none":""}`}
            >
              <Camera className="w-5 h-5 text-base-200"/>
              <input type="file"
              id="avatar-upload"
              className="hidden"
              accept= "image/*"
              onChange={handleImageUpload}
              disable={isUploadingProfile}/>

            </label>
          </div>
        </div>
      </div>

    </div>
  </div>
  
};

export default Profile;
