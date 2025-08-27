import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, User, Mail } from "lucide-react";

const Profile = () => {
  const { authUser, isUploadingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; //gets the first selected file from the input (<input type="file">).
    if (!file) return;

    //calidate file
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
       // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    
    setSelectedImage(URL.createObjectURL(file)); //for preview
    updateProfile({profileImage: file}); //send file directly to server
    
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your Profile Information</p>
          </div>

          {/* avatar section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImage || authUser.profileImageURL || "/avatar.png"}
                onError={(e) => (e.currentTarget.src = "/avatar.png")}
                alt="Profile Picture"
                className="size-32 rounded-full object-cover border-4 border-green-700"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUploadingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploadingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUploadingProfile
                ? "Uploading..."
                : "Click the camera to change your profile picture"}
            </p>
          </div>

          {/* User info section */}
          <div className="space-y-6">
            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4"></User>
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-zinc-700">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1 5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4"></Mail>
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border border-zinc-700">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500"> Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
