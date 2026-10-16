
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getAllNotes } from "../api/noteApi";
import { courses } from "../data/courses";

const NOTES_API = "http://localhost:5000/api/notes";

function Notes() {
  const { subjectName } = useParams();
  const [searchParams] = useSearchParams();

  let decodedSubject = "All";

  try {
    decodedSubject = decodeURIComponent(subjectName || "All");
  } catch {
    decodedSubject = subjectName || "All";
  }

  // Read academic context from the URL, if provided.
  const routeCourse = searchParams.get("course") || "";
  const routeBranch = searchParams.get("branch") || "";
  const routeYear = searchParams.get("year") || "";
  const routeSemester = searchParams.get("semester") || "";

  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(routeCourse);
  const [selectedBranch, setSelectedBranch] = useState(routeBranch);
  const [selectedYear, setSelectedYear] = useState(routeYear);
  const [selectedSemester, setSelectedSemester] = useState(routeSemester);
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadError, setDownloadError] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [notesError, setNotesError] = useState("");

  useEffect(() => {
    setSelectedCourse(routeCourse);
    setSelectedBranch(routeBranch);
    setSelectedYear(routeYear);
    setSelectedSemester(routeSemester);
  }, [routeCourse, routeBranch, routeYear, routeSemester]);

  useEffect(() => {
    let active = true;

    const fetchNotes = async () => {
      try {
        setLoadingNotes(true);
        setNotesError("");

        const data = await getAllNotes();

        if (active) {
          setNotes(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);

        if (active) {
          setNotesError("Unable to load notes. Please try again.");
        }
      } finally {
        if (active) {
          setLoadingNotes(false);
        }
      }
    };

    fetchNotes();

    return () => {
      active = false;
    };
  }, []);

  const courseData = courses.find(
    (course) => course.name === selectedCourse
  );

  const branchData = courseData?.branches?.find(
    (branch) => branch.name === selectedBranch
  );

  const yearData = branchData?.years?.find(
    (year) => year.year === selectedYear
  );

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notes.filter((note) => {
      const subjectMatchesRoute =
        decodedSubject === "All" ||
        note.subject?.toLowerCase() === decodedSubject.toLowerCase();

      const titleMatches = note.title?.toLowerCase().includes(query);
      const subjectMatchesSearch = note.subject
        ?.toLowerCase()
        .includes(query);

      const searchMatches =
        !query || titleMatches || subjectMatchesSearch;

      const courseMatches =
        !selectedCourse || note.course === selectedCourse;

      const branchMatches =
        !selectedBranch || note.branch === selectedBranch;

      const yearMatches =
        !selectedYear || note.year === selectedYear;

      const semesterMatches =
        !selectedSemester || note.semester === selectedSemester;

      return (
        subjectMatchesRoute &&
        searchMatches &&
        courseMatches &&
        branchMatches &&
        yearMatches &&
        semesterMatches
      );
    });
  }, [
    notes,
    searchQuery,
    decodedSubject,
    selectedCourse,
    selectedBranch,
    selectedYear,
    selectedSemester,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCourse("");
    setSelectedBranch("");
    setSelectedYear("");
    setSelectedSemester("");
  };

  const handleDownload = async (note) => {
    if (downloadingId) return;

    setDownloadError("");
    setDownloadingId(note._id);

    try {
      const response = await axios.get(
        `${NOTES_API}/${note._id}/download`
      );

      const fileUrl = response.data?.fileUrl || note.fileUrl;

      if (!fileUrl) {
        throw new Error("The PDF URL is unavailable.");
      }

      setNotes((previousNotes) =>
        previousNotes.map((item) =>
          item._id === note._id
            ? {
                ...item,
                downloads: response.data?.downloads ?? item.downloads,
              }
            : item
        )
      );

      window.open(fileUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Download tracking failed:", error);

      setDownloadError(
        error.response?.data?.message ||
          "Unable to open this PDF. Please try again."
      );
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            {decodedSubject === "All" ? "All Notes" : decodedSubject}
          </h1>

          <p className="mt-2 text-slate-500">
            {loadingNotes
              ? "Loading notes..."
              : `Showing ${filteredNotes.length} of ${notes.length} notes`}
          </p>

          {(selectedCourse ||
            selectedBranch ||
            selectedYear ||
            selectedSemester) && (
            <p className="mt-2 text-sm text-blue-700">
              {[selectedCourse, selectedBranch, selectedYear, selectedSemester]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-slate-200 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Clear Filters
        </button>
      </div>

      {/* Search and filters */}
      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <label
            htmlFor="note-search"
            className="mb-2 block font-semibold text-slate-700"
          >
            Search Notes
          </label>

          <input
            id="note-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by note title or subject..."
            className="w-full rounded-xl border border-slate-200 p-3 pl-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="course-filter"
              className="mb-2 block font-semibold text-slate-700"
            >
              Course
            </label>

            <select
              id="course-filter"
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setSelectedBranch("");
                setSelectedYear("");
                setSelectedSemester("");
              }}
              className="w-full rounded-lg border p-3"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="branch-filter"
              className="mb-2 block font-semibold text-slate-700"
            >
              Branch
            </label>

            <select
              id="branch-filter"
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedYear("");
                setSelectedSemester("");
              }}
              disabled={!selectedCourse}
              className="w-full rounded-lg border p-3 disabled:bg-slate-100"
            >
              <option value="">All Branches</option>
              {courseData?.branches?.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="year-filter"
              className="mb-2 block font-semibold text-slate-700"
            >
              Year
            </label>

            <select
              id="year-filter"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
                setSelectedSemester("");
              }}
              disabled={!selectedBranch}
              className="w-full rounded-lg border p-3 disabled:bg-slate-100"
            >
              <option value="">All Years</option>
              {branchData?.years?.map((year, index) => (
                <option key={index} value={year.year}>
                  {year.year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="semester-filter"
              className="mb-2 block font-semibold text-slate-700"
            >
              Semester
            </label>

            <select
              id="semester-filter"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              disabled={!selectedYear}
              className="w-full rounded-lg border p-3 disabled:bg-slate-100"
            >
              <option value="">All Semesters</option>
              {yearData?.semesters?.map((semester, index) => (
                <option key={index} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {downloadError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
        >
          {downloadError}
        </p>
      )}

      {/* Notes */}
      <section className="mt-10">
        {loadingNotes ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Loading notes...
          </div>
        ) : notesError ? (
          <div
            role="alert"
            className="rounded-2xl bg-white p-10 text-center shadow-sm"
          >
            <p className="font-semibold text-red-600">{notesError}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-700">
              No Notes Found
            </h2>

            <p className="mt-3 text-slate-500">
              No notes match this subject and academic selection yet. Try
              changing your filters or check back after notes are uploaded.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Search and Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredNotes.map((note) => (
              <article
                key={note._id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl"
              >
                <div className="bg-blue-600 p-5 text-white">
                  <h2 className="break-words text-xl font-bold">
                    {note.title}
                  </h2>
                </div>

                <div className="space-y-3 p-5">
                  {[
                    ["Subject", note.subject],
                    ["Course", note.course],
                    ["Branch", note.branch],
                    ["Year", note.year],
                    ["Semester", note.semester],
                    ["Uploaded By", note.uploaderName],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex justify-between gap-4"
                    >
                      <span className="font-semibold text-slate-600">
                        {label}
                      </span>

                      <span className="break-words text-right">
                        {value || "—"}
                      </span>
                    </div>
                  ))}

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => handleDownload(note)}
                      disabled={downloadingId !== null}
                      className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {downloadingId === note._id
                        ? "Opening PDF..."
                        : "📄 View PDF"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Notes;
