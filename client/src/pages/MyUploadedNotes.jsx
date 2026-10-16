
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

function MyUploadedNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    subject: "",
    course: "",
    branch: "",
    year: "",
    semester: "",
  });

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const fetchMyNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your uploaded notes.");
        return;
      }

      const response = await axios.get(
        `${API_URL}/my`,
        getAuthConfig()
      );

      setNotes(response.data.notes || []);
    } catch (err) {
      console.error("Fetch My Notes Error:", err);

      setError(
        err.response?.status === 401
          ? "Your session has expired. Please log in again."
          : err.response?.data?.message ||
              "Unable to load your notes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyNotes();
  }, []);

  const startEditing = (note) => {
    setEditingId(note._id);

    setEditForm({
      title: note.title || "",
      subject: note.subject || "",
      course: note.course || "",
      branch: note.branch || "",
      year: note.year || "",
      semester: note.semester || "",
    });

    setError("");
  };

  const cancelEditing = () => {
    setEditingId(null);

    setEditForm({
      title: "",
      subject: "",
      course: "",
      branch: "",
      year: "",
      semester: "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleUpdate = async (e, noteId) => {
    e.preventDefault();

    const requiredFields = [
      "title",
      "subject",
      "course",
      "branch",
      "year",
      "semester",
    ];

    for (const field of requiredFields) {
      if (!editForm[field].trim()) {
        setError(`Please enter ${field}.`);
        return;
      }
    }

    try {
      setSaving(true);
      setError("");

      const response = await axios.put(
        `${API_URL}/${noteId}`,
        editForm,
        getAuthConfig()
      );

      const updatedNote = response.data.note;

      setNotes((previous) =>
        previous.map((note) =>
          note._id === noteId ? updatedNote : note
        )
      );

      cancelEditing();
      alert(response.data.message || "Note updated successfully.");
    } catch (err) {
      console.error("Update Note Error:", err);

      setError(
        err.response?.status === 401
          ? "Your session has expired. Please log in again."
          : err.response?.data?.message ||
              "Unable to update this note."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (note) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${note.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(note._id);
      setError("");

      const response = await axios.delete(
        `${API_URL}/${note._id}`,
        getAuthConfig()
      );

      setNotes((previous) =>
        previous.filter((item) => item._id !== note._id)
      );

      if (editingId === note._id) {
        cancelEditing();
      }

      alert(response.data.message || "Note deleted successfully.");
    } catch (err) {
      console.error("Delete Note Error:", err);

      setError(
        err.response?.status === 401
          ? "Your session has expired. Please log in again."
          : err.response?.data?.message ||
              "Unable to delete this note."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const openNote = (note) => {
    if (!note.fileUrl) {
      setError("The PDF file URL is unavailable.");
      return;
    }

    window.open(note.fileUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">Loading your uploaded notes...</p>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            My Uploaded Notes
          </h1>

          <p className="mt-2 text-slate-600">
            View, edit, and manage the notes you have shared.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchMyNotes}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Refresh Notes
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {error}
        </div>
      )}

      <div className="mt-8">
        {notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              No uploaded notes yet
            </h2>

            <p className="mt-2 text-slate-600">
              Notes you upload while logged in will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {notes.map((note) => (
              <div
                key={note._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                {editingId === note._id ? (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => handleUpdate(e, note._id)}
                  >
                    <h2 className="text-xl font-semibold text-slate-800">
                      Edit Note
                    </h2>

                    {[
                      ["title", "Note Title"],
                      ["subject", "Subject"],
                      ["course", "Course"],
                      ["branch", "Branch"],
                      ["year", "Year"],
                      ["semester", "Semester"],
                    ].map(([name, label]) => (
                      <div key={name}>
                        <label
                          htmlFor={`${note._id}-${name}`}
                          className="mb-1 block text-sm font-medium text-slate-700"
                        >
                          {label}
                        </label>

                        <input
                          id={`${note._id}-${name}`}
                          name={name}
                          type="text"
                          required
                          value={editForm[name]}
                          onChange={handleEditChange}
                          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    ))}

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>

                      <button
                        type="button"
                        disabled={saving}
                        onClick={cancelEditing}
                        className="rounded-lg border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="break-words text-xl font-semibold text-slate-800">
                          {note.title}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                          {note.subject}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        PDF
                      </span>
                    </div>

                    <div className="mt-5 space-y-2 text-sm text-slate-600">
                      <p>
                        <span className="font-medium text-slate-800">
                          Course:
                        </span>{" "}
                        {note.course}
                      </p>

                      <p>
                        <span className="font-medium text-slate-800">
                          Branch:
                        </span>{" "}
                        {note.branch}
                      </p>

                      <p>
                        <span className="font-medium text-slate-800">
                          Year:
                        </span>{" "}
                        {note.year}
                      </p>

                      <p>
                        <span className="font-medium text-slate-800">
                          Semester:
                        </span>{" "}
                        {note.semester}
                      </p>

                      <p>
                        <span className="font-medium text-slate-800">
                          Downloads:
                        </span>{" "}
                        {note.downloads ?? 0}
                      </p>

                      {note.createdAt && (
                        <p>
                          <span className="font-medium text-slate-800">
                            Uploaded:
                          </span>{" "}
                          {new Date(note.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openNote(note)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        View PDF
                      </button>

                      <button
                        type="button"
                        onClick={() => startEditing(note)}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === note._id}
                        onClick={() => handleDelete(note)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {deletingId === note._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyUploadedNotes;
