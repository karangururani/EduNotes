function Dashboard() {
  const recentUploads = [
    {
      title: "DBMS Unit 1 Notes",
      uploader: "Rahul Sharma",
      time: "2 hours ago",
    },
    {
      title: "Java Important Questions",
      uploader: "Priya Singh",
      time: "5 hours ago",
    },
    {
      title: "Machine Learning Notes",
      uploader: "Aman Verma",
      time: "1 day ago",
    },
  ];

  const trendingSubjects = [
    "DBMS",
    "Java",
    "Machine Learning",
    "Operating System",
    "Computer Networks",
  ];

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-10 shadow-lg">
        <h1 className="text-5xl font-bold">
          Welcome to EduNotes 📚
        </h1>

        <p className="mt-4 text-lg text-blue-100 max-w-2xl">
          Share notes, access study materials, and
          collaborate with students from different
          courses and branches.
        </p>

        <div className="mt-6 flex gap-4">
          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Explore Notes
          </button>

          <button className="bg-blue-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Upload Notes
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mt-8">
        <input
          type="text"
          placeholder="Search notes, subjects, courses..."
          className="w-full bg-white p-4 rounded-2xl shadow-sm border outline-none"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500">
            Total Notes
          </h3>
          <h2 className="text-4xl font-bold mt-2">
            1,245
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500">
            Students
          </h3>
          <h2 className="text-4xl font-bold mt-2">
            560
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500">
            Courses
          </h3>
          <h2 className="text-4xl font-bold mt-2">
            25
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <h3 className="text-slate-500">
            Downloads
          </h3>
          <h2 className="text-4xl font-bold mt-2">
            18K+
          </h2>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Recent Uploads
        </h2>

        <div className="mt-4 space-y-4">
          {recentUploads.map((note, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-sm"
            >
              <h3 className="font-semibold text-lg">
                {note.title}
              </h3>

              <p className="text-slate-500 mt-1">
                Uploaded by {note.uploader}
              </p>

              <p className="text-sm text-slate-400 mt-1">
                {note.time}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Subjects */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-slate-800">
          Trending Subjects 🔥
        </h2>

        <div className="flex flex-wrap gap-4 mt-4">
          {trendingSubjects.map((subject, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-medium"
            >
              {subject}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;