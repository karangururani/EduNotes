import { FaDownload } from "react-icons/fa";

function RecentNotes() {
  const notes = [
    {
      title: "DBMS Unit 1 Notes",
      subject: "DBMS",
      uploader: "Karan Gururani",
    },
    {
      title: "Java Complete Notes",
      subject: "Java",
      uploader: "Rahul Sharma",
    },
    {
      title: "TOC Important Questions",
      subject: "TOC",
      uploader: "Priya Singh",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Recent Notes
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {note.subject}
            </span>

            <h3 className="text-xl font-semibold mt-4">
              {note.title}
            </h3>

            <p className="text-slate-500 mt-2">
              Uploaded by {note.uploader}
            </p>

            <button className="mt-5 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <FaDownload />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentNotes;