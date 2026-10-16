
const createYears = (yearCount) =>
  Array.from({ length: yearCount }, (_, index) => ({
    year: `${index + 1}${["st", "nd", "rd"][index] || "th"} Year`,
    semesters: [
      `Semester ${index * 2 + 1}`,
      `Semester ${index * 2 + 2}`,
    ],
  }));

const createBranch = (id, name, yearCount) => ({
  id,
  name,
  years: createYears(yearCount),
});

export const courses = [
  {
    id: 1,
    name: "B.Tech",
    branches: [
      createBranch(1, "CSE", 4),
      createBranch(2, "AI & ML", 4),
      createBranch(3, "Data Science", 4),
      createBranch(4, "Cyber Security", 4),
      createBranch(5, "Information Technology", 4),
    ],
  },
  {
    id: 2,
    name: "BCA",
    branches: [createBranch(1, "General", 3)],
  },
  {
    id: 3,
    name: "MCA",
    branches: [createBranch(1, "General", 2)],
  },
  {
    id: 4,
    name: "BBA",
    branches: [createBranch(1, "General", 3)],
  },
  {
    id: 5,
    name: "MBA",
    branches: [
      createBranch(1, "Finance", 2),
      createBranch(2, "Marketing", 2),
      createBranch(3, "HR", 2),
    ],
  },
];
