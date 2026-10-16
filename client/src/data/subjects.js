
const createSemesters = (semesterSubjects) =>
  Object.fromEntries(
    semesterSubjects.map((subjects, index) => [index, subjects])
  );

export const subjects = {
  // B.Tech — Computer Science and Engineering
  CSE: createSemesters([
    ["Mathematics-I", "Physics", "Programming in C", "Basic Electrical Engineering", "Environmental Studies"],
    ["Mathematics-II", "Chemistry", "Data Structures", "Digital Logic Design", "Communication Skills"],
    ["Discrete Mathematics", "Object-Oriented Programming", "DBMS", "Computer Organization", "Operating Systems"],
    ["Computer Networks", "Theory of Computation", "Software Engineering", "Design and Analysis of Algorithms", "Probability and Statistics"],
    ["Machine Learning", "Compiler Design", "Cloud Computing", "Web Development", "Artificial Intelligence"],
    ["Cyber Security", "Data Mining", "Internet of Things", "Distributed Systems", "Software Testing"],
    ["Blockchain Technology", "DevOps", "Big Data Analytics", "Elective-I", "Major Project-I"],
    ["Industry Training", "Research Methodology", "Professional Elective", "Major Project-II"],
  ]),

  // B.Tech — Artificial Intelligence and Machine Learning
  "AI & ML": createSemesters([
    ["Mathematics-I", "Physics", "Programming in C", "Basic Electrical Engineering", "Environmental Studies"],
    ["Mathematics-II", "Chemistry", "Python Programming", "Digital Logic Design", "Communication Skills"],
    ["Discrete Mathematics", "Data Structures", "DBMS", "Object-Oriented Programming", "Computer Organization"],
    ["Operating Systems", "Computer Networks", "Probability and Statistics", "Artificial Intelligence", "Design and Analysis of Algorithms"],
    ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision", "Software Engineering"],
    ["Reinforcement Learning", "Big Data Analytics", "MLOps", "Generative AI", "AI Ethics"],
    ["Advanced Deep Learning", "AI Applications", "Elective-I", "Research Methodology", "Major Project-I"],
    ["Industry Training", "Professional Elective", "Major Project-II"],
  ]),

  // B.Tech — Data Science
  "Data Science": createSemesters([
    ["Mathematics-I", "Physics", "Programming in C", "Basic Electrical Engineering", "Environmental Studies"],
    ["Mathematics-II", "Chemistry", "Python Programming", "Digital Logic Design", "Communication Skills"],
    ["Statistics and Probability", "Data Structures", "DBMS", "Object-Oriented Programming", "Computer Organization"],
    ["Operating Systems", "Computer Networks", "Linear Algebra", "Data Analytics", "Design and Analysis of Algorithms"],
    ["Machine Learning", "Data Mining", "Big Data Technologies", "Data Visualization", "Artificial Intelligence"],
    ["Deep Learning", "Natural Language Processing", "Time Series Analysis", "Data Warehousing", "Cloud Computing"],
    ["Business Intelligence", "MLOps", "Elective-I", "Research Methodology", "Major Project-I"],
    ["Industry Training", "Professional Elective", "Major Project-II"],
  ]),

  // B.Tech — Cyber Security
  "Cyber Security": createSemesters([
    ["Mathematics-I", "Physics", "Programming in C", "Basic Electrical Engineering", "Environmental Studies"],
    ["Mathematics-II", "Chemistry", "Python Programming", "Digital Logic Design", "Communication Skills"],
    ["Data Structures", "DBMS", "Object-Oriented Programming", "Computer Organization", "Discrete Mathematics"],
    ["Operating Systems", "Computer Networks", "Cryptography", "Web Technologies", "Software Engineering"],
    ["Network Security", "Ethical Hacking", "Cyber Laws", "Secure Coding", "Cloud Computing"],
    ["Digital Forensics", "Penetration Testing", "Malware Analysis", "Application Security", "Security Operations"],
    ["Incident Response", "Threat Intelligence", "Elective-I", "Research Methodology", "Major Project-I"],
    ["Industry Training", "Professional Elective", "Major Project-II"],
  ]),

  // B.Tech — Information Technology
  "Information Technology": createSemesters([
    ["Mathematics-I", "Physics", "Programming Fundamentals", "Basic Electrical Engineering", "Environmental Studies"],
    ["Mathematics-II", "Chemistry", "Data Structures", "Digital Logic Design", "Communication Skills"],
    ["DBMS", "Java Programming", "Object-Oriented Programming", "Computer Organization", "Discrete Mathematics"],
    ["Operating Systems", "Computer Networks", "Software Engineering", "Design and Analysis of Algorithms", "Web Technologies"],
    ["Cloud Computing", "Information Security", "Data Mining", "Mobile Application Development", "Software Testing"],
    ["DevOps", "Distributed Systems", "Big Data Analytics", "Internet of Things", "Artificial Intelligence"],
    ["Enterprise Application Development", "IT Service Management", "Elective-I", "Research Methodology", "Major Project-I"],
    ["Industry Training", "Professional Elective", "Major Project-II"],
  ]),

  // BCA — General
  "General": createSemesters([
    ["Computer Fundamentals", "Programming in C", "Mathematics-I", "Digital Electronics", "Communication Skills"],
    ["Data Structures", "Object-Oriented Programming", "Mathematics-II", "Computer Organization", "Environmental Studies"],
    ["DBMS", "Java Programming", "Operating Systems", "Web Development", "Computer Networks"],
    ["Python Programming", "Software Engineering", "Computer Graphics", "E-Commerce", "Cyber Security"],
    ["Data Analytics", "Cloud Computing", "Mobile Application Development", "Artificial Intelligence", "Elective-I"],
    ["Machine Learning Fundamentals", "Project Work", "Software Testing", "Professional Elective"],
  ]),

  // MCA — General
  MCA: createSemesters([
    ["Advanced Programming", "Discrete Mathematics", "Database Management Systems", "Computer Organization", "Operating Systems"],
    ["Data Structures and Algorithms", "Object-Oriented Programming", "Computer Networks", "Software Engineering", "Web Technologies"],
    ["Cloud Computing", "Machine Learning", "Advanced Database Systems", "Cyber Security", "Elective-I"],
    ["DevOps", "Big Data Analytics", "Research Methodology", "Professional Elective", "Major Project"],
  ]),

  // BBA — General
  BBA: createSemesters([
    ["Principles of Management", "Business Economics", "Financial Accounting", "Business Mathematics", "Business Communication"],
    ["Marketing Management", "Human Resource Management", "Cost Accounting", "Business Statistics", "Organizational Behaviour"],
    ["Financial Management", "Business Law", "Operations Management", "Management Information Systems", "Entrepreneurship"],
    ["Consumer Behaviour", "Research Methods", "Business Analytics", "Elective-I", "Project Work"],
    ["Strategic Management", "International Business", "Digital Marketing", "Elective-II", "Summer Training Report"],
    ["Business Ethics", "Project Work", "Professional Elective", "Viva Voce"],
  ]),

  // MBA — Finance
  Finance: createSemesters([
    ["Principles of Management", "Managerial Economics", "Financial Accounting", "Marketing Management", "Organizational Behaviour"],
    ["Corporate Finance", "Investment Analysis", "Financial Markets", "Cost and Management Accounting", "Business Research Methods"],
    ["Financial Statement Analysis", "Portfolio Management", "Risk Management", "Banking and Insurance", "Financial Modelling"],
    ["International Finance", "Strategic Financial Management", "FinTech", "Elective-I", "Major Project"],
  ]),

  // MBA — Marketing
  Marketing: createSemesters([
    ["Principles of Management", "Managerial Economics", "Financial Accounting", "Marketing Management", "Organizational Behaviour"],
    ["Consumer Behaviour", "Sales and Distribution Management", "Brand Management", "Digital Marketing", "Business Research Methods"],
    ["Marketing Research", "Product and Pricing Strategy", "Integrated Marketing Communications", "Retail Management", "Customer Relationship Management"],
    ["International Marketing", "Marketing Analytics", "Strategic Marketing", "Elective-I", "Major Project"],
  ]),

  // MBA — Human Resources
  HR: createSemesters([
    ["Principles of Management", "Managerial Economics", "Financial Accounting", "Marketing Management", "Organizational Behaviour"],
    ["Human Resource Management", "Talent Acquisition", "Training and Development", "Performance Management", "Business Research Methods"],
    ["Compensation Management", "Labour Laws", "Industrial Relations", "HR Analytics", "Organizational Development"],
    ["Strategic HRM", "Leadership and Change Management", "International HRM", "Elective-I", "Major Project"],
  ]),
};
