
import { useEffect, useRef, useState } from "react";
import {
  FaUserCircle,
  FaBookOpen,
  FaDownload,
  FaAward,
} from "react-icons/fa";
import { FiEdit2, FiCamera, FiUpload } from "react-icons/fi";
import {
  updateUserProfile,
  uploadProfilePicture,
} from "../api/authApi";
import axios from "axios";

const NOTES_API = "http://localhost:5000/api/notes";

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [stats, setStats] = useState({
    uploadedNotes: null,
    downloads: null,
    reputation: null,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  const editFormRef = useRef(null);
  const imageInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    course: "",
    branch: "",
    year: "",
  });

  // Load the logged-in user from localStorage.
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);

        setFormData({
          name: parsedUser.name || "",
          username: parsedUser.username || "",
          email: parsedUser.email || "",
          course: parsedUser.course || "",
          branch: parsedUser.branch || "",
          year: parsedUser.year || "",
        });
      }
    } catch (error) {
      console.error("Unable to load profile:", error);
      setErrorMessage("Unable to load your profile. Please log in again.");
    }
  }, []);

  // Fetch actual profile statistics from the backend.
  useEffect(() => {
    const fetchProfileStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatsError("Please log in to view your statistics.");
        setLoadingStats(false);
        return;
      }

      try {
        setLoadingStats(true);
        setStatsError("");

        const response = await axios.get(
          `${NOTES_API}/profile/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data?.success || !response.data?.stats) {
          throw new Error("The server returned invalid statistics.");
        }

        setStats({
          uploadedNotes: response.data.stats.uploadedNotes ?? null,
          downloads: response.data.stats.downloads ?? null,
          reputation: response.data.stats.reputation ?? null,
        });
      } catch (error) {
        console.error("Unable to fetch profile statistics:", error);

        setStatsError(
          error.response?.data?.message ||
            error.message ||
            "Unable to load profile statistics."
        );
      } finally {
        setLoadingStats(false);
      }
    };

    fetchProfileStats();
  }, []);

  // Release temporary preview URLs when replaced or removed.
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const displayName = user?.name || "EduNotes Student";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Handle profile text fields.
  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // Open or close profile editing.
  const handleEditClick = () => {
    setMessage("");
    setErrorMessage("");

    if (editing) {
      setEditing(false);
      return;
    }

    setFormData({
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      course: user?.course || "",
      branch: user?.branch || "",
      year: user?.year || "",
    });

    setEditing(true);

    setTimeout(() => {
      editFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // Select and validate a profile image.
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    setMessage("");
    setErrorMessage("");

    if (!file) {
      setSelectedImage(null);
      setPreviewUrl("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setSelectedImage(null);
      setPreviewUrl("");
      setErrorMessage("Choose a JPG, PNG, or WebP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedImage(null);
      setPreviewUrl("");
      setErrorMessage("Image size must be 5 MB or less.");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Upload the selected image to Cloudinary through the backend.
  const handleImageUpload = async () => {
    const fileToUpload =
      imageInputRef.current?.files?.[0] || selectedImage;

    if (!fileToUpload) {
      setErrorMessage("Please choose an image again.");
      return;
    }

    setUploadingImage(true);
    setMessage("");
    setErrorMessage("");

    try {
      const response = await uploadProfilePicture(fileToUpload);

      if (!response.user) {
        throw new Error("The server did not return updated user details.");
      }

      const updatedUser = response.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSelectedImage(null);
      setPreviewUrl("");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      setMessage("Profile picture uploaded successfully.");
    } catch (error) {
      console.error("Profile picture upload failed:", error);

      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to upload your picture. Please try again."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // Cancel the pending image selection.
  const handleCancelImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    setErrorMessage("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Save profile details to MongoDB.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      const response = await updateUserProfile({
        ...formData,
        year: formData.year.trim(),
      });

      if (!response.user) {
        throw new Error("The server did not return updated user details.");
      }

      const updatedUser = response.user;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setFormData({
        name: updatedUser.name || "",
        username: updatedUser.username || "",
        email: updatedUser.email || "",
        course: updatedUser.course || "",
        branch: updatedUser.branch || "",
        year: updatedUser.year || "",
      });

      setEditing(false);
      setMessage("Your profile has been saved successfully.");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const academicDetails = [
    { label: "Course", value: user?.course },
    { label: "Branch", value: user?.branch },
    { label: "Year", value: user?.year },
  ];

  const statistics = [
    {
      title: "Uploaded Notes",
      value: loadingStats
        ? "..."
        : stats.uploadedNotes ?? "—",
      icon: <FaBookOpen />,
    },
    {
      title: "Downloads",
      value: loadingStats ? "..." : stats.downloads ?? "—",
      icon: <FaDownload />,
    },
    {
      title: "Reputation",
      value: loadingStats ? "..." : stats.reputation ?? "—",
      icon: <FaAward />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile header */}
      <section className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-violet-600" />

        <div className="relative px-8 pb-8">
          <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="relative shrink-0">
                {previewUrl || user?.avatar ? (
                  <img
                    src={previewUrl || user.avatar}
                    alt="Profile"
                    className="h-32 w-32 rounded-3xl border-4 border-white bg-white object-cover shadow-md"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 text-4xl font-bold text-violet-600 shadow-md">
                    {user ? initials : <FaUserCircle />}
                  </div>
                )}

                <button
                  type="button"
                  title="Choose profile picture"
                  aria-label="Choose profile picture"
                  disabled={!user || uploadingImage}
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 rounded-full bg-violet-600 p-3 text-white shadow-lg transition hover:bg-violet-700 disabled:opacity-50"
                >
                  <FiCamera size={18} />
                </button>
              </div>

              <div className="pb-1">
                <h1 className="text-3xl font-bold text-slate-800">
                  {displayName}
                </h1>

                <p className="mt-1 text-slate-500">
                  {user?.username
                    ? `@${user.username}`
                    : "Username not set"}
                </p>

                <p className="mt-2 text-slate-600">
                  {[user?.course, user?.branch, user?.year]
                    .filter(Boolean)
                    .join(" • ") || "Add your academic details"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleEditClick}
              disabled={!user || saving || uploadingImage}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiEdit2 />
              {editing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          {/* Hidden image input */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* Image upload controls */}
          {selectedImage && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <p className="mr-2 max-w-full break-all text-sm text-slate-600">
                Selected: {selectedImage.name}
              </p>

              <button
                type="button"
                onClick={handleImageUpload}
                disabled={uploadingImage}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-50"
              >
                <FiUpload />
                {uploadingImage ? "Uploading..." : "Upload Picture"}
              </button>

              <button
                type="button"
                disabled={uploadingImage}
                onClick={handleCancelImage}
                className="rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-500">
            JPG, PNG, or WebP · Maximum 5 MB
          </p>

          {!user && (
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              No saved user information was found. Please log in again.
            </p>
          )}
        </div>
      </section>

      {/* Status messages */}
      {message && (
        <div
          role="status"
          className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800"
        >
          {message}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {/* Profile statistics */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statistics.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl bg-white p-7 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-500">{item.title}</p>
              <div className="rounded-2xl bg-violet-50 p-4 text-xl text-violet-600">
                {item.icon}
              </div>
            </div>

            <p className="mt-8 text-3xl font-bold text-slate-800">
              {item.value}
            </p>
          </div>
        ))}
      </section>

      {statsError && (
        <p
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800"
        >
          Could not load statistics: {statsError}
        </p>
      )}

      {/* Edit profile form */}
      {editing && (
        <section
          ref={editFormRef}
          className="scroll-mt-6 rounded-3xl bg-white p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-800">
            Edit Your Profile
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your changes will be saved to your EduNotes account.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {[
                { name: "name", label: "Full Name", required: true },
                { name: "username", label: "Username", required: true },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  required: true,
                },
                { name: "course", label: "Course" },
                { name: "branch", label: "Branch" },
                { name: "year", label: "Year" },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block font-medium text-slate-700"
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required || false}
                    disabled={saving}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 disabled:bg-slate-100"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleEditClick}
                className="rounded-xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Personal information */}
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-800">
          Personal Information
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Full Name</p>
            <p className="mt-1 font-semibold text-slate-800">
              {user?.name || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Username</p>
            <p className="mt-1 font-semibold text-slate-800">
              {user?.username ? `@${user.username}` : "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email Address</p>
            <p className="mt-1 break-all font-semibold text-slate-800">
              {user?.email || "Not provided"}
            </p>
          </div>

          {academicDetails.map((detail) => (
            <div key={detail.label}>
              <p className="text-sm text-slate-500">{detail.label}</p>
              <p className="mt-1 font-semibold text-slate-800">
                {detail.value || "Not provided"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;
