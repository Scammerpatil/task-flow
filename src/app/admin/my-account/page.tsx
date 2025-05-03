"use client";

import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { IconCloudUpload } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthProvider";
import { Admin } from "@/types/user";

const MyAccount = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Admin>(user! as unknown as Admin);
  const [editing, setEditing] = useState(false);

  if (!user) return <div className="text-center py-10">Loading...</div>;

  const handleSave = async () => {
    try {
      const res = axios.post("/api/update", formData);
      toast.promise(res, {
        loading: "Updating your information...",
        success: "Information updated successfully!",
        error: (e: any) => {
          return e.response?.data?.message || "Failed to update information";
        },
      });
      setEditing(false);
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", { file });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setFormData({
            ...formData,
            profileImage: data.data.data.url,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center uppercase">
        My Account
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-base-200 border border-base-content rounded-xl p-6 shadow">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={formData.profileImage}
              alt={formData.name}
              className="w-28 h-28 rounded-full object-cover"
            />
            <div className="text-center">
              <h2 className="text-lg font-semibold">Profile Picture</h2>
              <p className="text-sm text-base-content/60">JPG, Max 5MB</p>
            </div>
            <input
              type="file"
              id="profileImageInput"
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
            <button
              className="btn btn-primary btn-sm"
              disabled={!editing}
              onClick={() =>
                document.getElementById("profileImageInput")?.click()
              }
            >
              <IconCloudUpload size={18} className="mr-2" />
              Upload Image
            </button>
          </div>
        </div>

        {/* Info Form */}
        <div className="xl:col-span-2 bg-base-200 border border-base-content rounded-xl p-6 shadow space-y-6">
          <h2 className="text-xl font-semibold">General Information</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label label-text">
                Name <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                disabled={!editing}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label label-text">
                Mobile Number <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                disabled={!editing}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label label-text">
                Email <span className="text-error">*</span>
              </label>
              <input
                type="email"
                value={formData.email || ""}
                readOnly
                className="input input-bordered input-primary w-full"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            {editing ? (
              <button className="btn btn-success w-full" onClick={handleSave}>
                Save Changes
              </button>
            ) : (
              <button
                className="btn btn-accent w-full"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
