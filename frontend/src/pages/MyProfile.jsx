import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaCamera } from "react-icons/fa";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });

  const [previewImage, setPreviewImage] = useState(userData.image);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setUserData({
        ...userData,
        address: { ...userData.address, [name]: value },
      });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUserData({ ...userData, image: file });
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Profile saved:", userData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="relative">
            <img
              src={previewImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md"
            />

            {/* Camera Icon Overlay */}
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <FaCamera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h2>
            <p className="text-gray-500">{userData.email}</p>
            <p className="text-sm text-gray-400">Member since 2023</p>
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100"
                }`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Gender</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100"
                }`}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={userData.dob}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Address Line 1</label>
              <input
                type="text"
                name="line1"
                value={userData.address.line1}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-1">Address Line 2</label>
            <input
              type="text"
              name="line2"
              value={userData.address.line2}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                isEditing ? "bg-white border-gray-300" : "bg-gray-100"
              }`}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditToggle}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition"
            >
              Edit Information
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

