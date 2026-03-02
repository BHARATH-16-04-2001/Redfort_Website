import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: { Authorization: `Bearer ${token}` },
  });

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await api.get("user/profile/");
      setUser(res.data);
      setForm({
        first_name: res.data.first_name || "",
        last_name: res.data.last_name || "",
        email: res.data.email || "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= UPDATE PROFILE =================
  const updateProfile = async () => {
    try {
      await api.put("user/profile/", form);
      alert("Profile updated successfully");
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      alert(err.response?.data?.detail || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        My Profile
      </h1>

      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Username (Read Only) */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            value={user?.username || ""}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={form.first_name}
            disabled={!editMode}
            onChange={(e) =>
              setForm({ ...form, first_name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={form.last_name}
            disabled={!editMode}
            onChange={(e) =>
              setForm({ ...form, last_name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            disabled={!editMode}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition"
              >
                Cancel
              </button>

              <button
                onClick={updateProfile}
                className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
              >
                Save Changes
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
