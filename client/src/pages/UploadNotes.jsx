
import { useState } from "react";
import axios from "axios";
import { courses } from "../data/courses";

function UploadNotes() {
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [uploaderName, setUploaderName] = useState("");
  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);

  const selectedCourse = courses.find((c) => c.name === course);

  const selectedBranch = selectedCourse?.branches.find(
    (b) => b.name === branch
  );

  const selectedYear = selectedBranch?.years?.find(
    (y) => y.year === year
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      alert("Please log in before uploading notes.");
      return;
    }

    if (
      !course ||
      !branch ||
      !year ||
      !semester ||
      !subject.trim() ||
      !title.trim() ||
      !uploaderName.trim() ||
      !pdf
    ) {
      alert("Please fill in all fields and select a PDF file.");
      return;
    }

    if (pdf.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("course", course);
      formData.append("branch", branch);
      formData.append("year", year);
      formData.append("semester", semester);
      formData.append("subject", subject.trim());
      formData.append("title", title.trim());
      formData.append("uploaderName", uploaderName.trim());
      formData.append("pdf", pdf);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/notes/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message || "Note uploaded successfully.");

      setCourse("");
      setBranch("");
      setYear("");
      setSemester("");
      setSubject("");
      setTitle("");
      setUploaderName("");
      setPdf(null);

      const fileInput = document.getElementById("pdf-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload Notes Error:", error);

      if (error.response?.status === 401) {
        alert("Your session has expired. Please log in again.");
      } else {
        alert(
          error.response?.data?.message ||
            "Upload failed. Please try again."
        );
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-slate-800">
        Upload Notes
      </h1>

      <p className="mt-2 text-slate-600">
        Share your notes with other students.
      </p>

      <div className="bg-white p-8 rounded-2xl shadow-sm mt-8 max-w-3xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium">Course</label>
            <select
              required
              className="w-full border rounded-lg p-3"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                setBranch("");
                setYear("");
                setSemester("");
              }}
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Branch</label>
            <select
              required
              className="w-full border rounded-lg p-3"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
                setYear("");
                setSemester("");
              }}
            >
              <option value="">Select Branch</option>
              {selectedCourse?.branches.map((b) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Year</label>
            <select
              required
              className="w-full border rounded-lg p-3"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setSemester("");
              }}
            >
              <option value="">Select Year</option>
              {selectedBranch?.years?.map((y) => (
                <option key={y.year} value={y.year}>
                  {y.year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Semester</label>
            <select
              required
              className="w-full border rounded-lg p-3"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              disabled={!selectedYear}
            >
              <option value="">Select Semester</option>
              {selectedYear?.semesters?.map((sem) => (
                <option key={sem} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Subject</label>
            <input
              required
              type="text"
              placeholder="Enter Subject"
              className="w-full border rounded-lg p-3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Note Title</label>
            <input
              required
              type="text"
              placeholder="Example: DBMS Unit 1 Notes"
              className="w-full border rounded-lg p-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Uploader Name
            </label>
            <input
              required
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg p-3"
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Upload PDF</label>
            <input
              id="pdf-upload"
              required
              type="file"
              accept=".pdf,application/pdf"
              className="w-full border rounded-lg p-3"
              onChange={(e) => setPdf(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Notes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadNotes;
