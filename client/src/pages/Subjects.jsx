
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/courses";
import { subjects } from "../data/subjects";

function Subjects() {
  const {
    courseId,
    branchId,
    yearIndex,
    semesterIndex,
  } = useParams();

  const navigate = useNavigate();

  // Find the selected course.
  const course = courses.find(
    (item) => String(item.id) === courseId
  );

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Course Not Found
        </h2>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  // Find the selected branch.
  const branch = course.branches.find(
    (item) => String(item.id) === branchId
  );

  if (!branch) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Branch Not Found
        </h2>
        <button
          onClick={() => navigate(`/branches/${course.id}`)}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to Branches
        </button>
      </div>
    );
  }

  // Find the selected year.
  const year = branch.years?.[Number(yearIndex)];

  if (!year) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Year Not Found
        </h2>
        <button
          onClick={() =>
            navigate(`/years/${courseId}/${branchId}`)
          }
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to Years
        </button>
      </div>
    );
  }

  // Find the selected semester.
  const semesterList =
    typeof year === "string" ? [] : year.semesters || [];

  const semester = semesterList[Number(semesterIndex)];

  if (!semester) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Semester Not Found
        </h2>
        <button
          onClick={() =>
            navigate(
              `/semesters/${courseId}/${branchId}/${yearIndex}`
            )
          }
          className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Back to Semesters
        </button>
      </div>
    );
  }

  const yearName = typeof year === "string" ? year : year.year;

  /*
   * Semester index in subjects.js:
   * Year 1: indexes 0, 1
   * Year 2: indexes 2, 3
   * Year 3: indexes 4, 5
   * Year 4: indexes 6, 7
   *
   * semesterIndex is the index within the selected year (0 or 1).
   */
  const actualSemesterIndex =
    Number(yearIndex) * 2 + Number(semesterIndex);

  // Select subjects using both course and branch.
  const courseSubjects =
    course.name === "B.Tech"
      ? subjects[branch.name]
      : subjects[course.name] || subjects[branch.name];

  const branchSubjects =
    courseSubjects?.[actualSemesterIndex] || [];

  // Open notes with the selected academic details.
  const openSubjectNotes = (subject) => {
    const queryParams = new URLSearchParams({
      course: course.name,
      branch: branch.name,
      year: yearName,
      semester,
    });

    navigate(
      `/notes/${encodeURIComponent(subject)}?${queryParams.toString()}`
    );
  };

  return (
    <div className="p-6">
      {/* Page heading and breadcrumbs */}
      <div className="mb-8">
        <button
          onClick={() =>
            navigate(
              `/semesters/${courseId}/${branchId}/${yearIndex}`
            )
          }
          className="mb-5 text-sm font-semibold text-blue-600 hover:text-blue-800"
        >
          ← Back to Semesters
        </button>

        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <button
            onClick={() => navigate("/courses")}
            className="hover:text-blue-600"
          >
            Courses
          </button>

          <span>/</span>

          <button
            onClick={() => navigate(`/branches/${courseId}`)}
            className="hover:text-blue-600"
          >
            {course.name}
          </button>

          <span>/</span>

          <button
            onClick={() =>
              navigate(`/years/${courseId}/${branchId}`)
            }
            className="hover:text-blue-600"
          >
            {branch.name}
          </button>

          <span>/</span>

          <button
            onClick={() =>
              navigate(
                `/semesters/${courseId}/${branchId}/${yearIndex}`
              )
            }
            className="hover:text-blue-600"
          >
            {yearName}
          </button>

          <span>/</span>

          <span className="font-semibold text-slate-700">
            {semester}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
          Subjects
        </h1>

        <p className="mt-2 text-slate-500">
          Select a subject to view its notes.
        </p>

        <p className="mt-2 text-sm font-medium text-blue-700">
          {course.name} · {branch.name} · {yearName} · {semester}
        </p>
      </div>

      {/* Subject cards */}
      {branchSubjects.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-700">
            No Subjects Available
          </h2>

          <p className="mt-2 text-slate-500">
            No subjects have been configured for this semester yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {branchSubjects.map((subject, index) => (
            <button
              key={`${subject}-${index}`}
              type="button"
              onClick={() => openSubjectNotes(subject)}
              className="group rounded-2xl border border-slate-100 bg-white p-6 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl transition group-hover:bg-blue-100">
                📚
              </div>

              <h2 className="text-lg font-bold text-slate-800 transition group-hover:text-blue-600">
                {subject}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View notes for this subject
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">
                  Explore Notes
                </span>

                <span className="text-blue-600 transition group-hover:translate-x-1">
                  →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subjects;
