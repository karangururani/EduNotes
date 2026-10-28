<div align="center">

# 🎓 EduNotes

### Learn • Share • Grow

**A student-focused notes-sharing platform that helps engineering students discover, upload, organize, and access academic study materials.**

[![React](https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-File_Storage-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

**[🌐 Live Demo](https://edu-notes-pi.vercel.app/)** · **[📂 GitHub Repository](https://github.com/karangururani/EduNotes)**

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [Key Features](#-key-features)
- [How EduNotes Works](#-how-edunotes-works)
- [Technology Stack](#-technology-stack)
- [Application Architecture](#-application-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Overview](#-api-overview)
- [Database Overview](#-database-overview)
- [Deployment](#-deployment)
- [Security Considerations](#-security-considerations)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🚀 Overview

**EduNotes** is a full-stack web application built to make academic resource sharing easier for students.

Engineering students often collect notes, assignments, revision materials, and other study resources from different sources. EduNotes brings these resources together in one organized platform.

Students can create accounts, browse academic categories, upload notes, manage their own uploads, and access materials shared by other users.

The application uses a modern web stack:

- **React and Vite** for the user interface.
- **Node.js and Express.js** for backend services and REST API endpoints.
- **MongoDB Atlas** for persistent database storage.
- **Cloudinary** for cloud-based file and image storage.

The project is designed around a simple principle:

> Make academic resources easier to organize, discover, and share.

### 🌐 Live Application

Visit the deployed frontend:

**https://edu-notes-pi.vercel.app/**

The application interface is deployed, but backend-dependent features require the backend service, database, and environment variables to be configured correctly.

---

## 🎯 The Problem

Students frequently face several challenges when sharing academic resources:

- Notes are scattered across messaging apps, cloud drives, and personal devices.
- Finding material for a particular course, branch, year, or semester can be difficult.
- Useful study materials may remain inaccessible to students who need them.
- Managing previously uploaded documents can become inconvenient.
- Students may spend unnecessary time searching for resources instead of studying.

### 💡 The Solution

EduNotes provides a centralized platform where students can browse, share, and manage academic materials through a structured interface.

The goal is to encourage collaborative learning and make study resources easier to access.

---

## ✨ Key Features

### 1. 📊 Dashboard

A central dashboard provides an entry point to the application's main sections.

- Overview of the platform.
- Quick access to courses and notes.
- Navigation to upload and profile sections.
- Recent-notes section.
- Search interface for discovering resources.

*Note: Any displayed sample statistics or sample notes should be replaced with real database-backed values before being presented as live platform metrics.*

### 2. 📚 Course-Based Navigation

Academic resources can be explored through a structured hierarchy:

**Course → Branch → Year → Semester → Subject**

This structure helps students navigate materials according to their academic context.

The interface includes pages for:

- Courses
- Branches
- Academic years
- Semesters
- Subjects
- Notes

The available curriculum categories are application data and should be verified against official university syllabi before being treated as authoritative.

### 3. 📤 Upload Notes

Students can contribute academic materials to the platform.

The upload workflow is designed to let users submit notes and associated information through a dedicated interface.

Uploaded files can be stored using Cloudinary, while associated metadata can be stored in MongoDB.

### 4. 🔎 Browse and Search Notes

Students can explore available study materials through the notes interface.

The application includes browsing and search functionality to make relevant resources easier to find.

Where supported by the current implementation, students can narrow their search using available categories or filters.

### 5. 👤 User Authentication

EduNotes includes registration and login functionality.

The backend uses:

- Express.js API endpoints.
- MongoDB for user records.
- `bcryptjs` for password hashing.
- JSON Web Tokens (JWT) for token-based authentication.

Authenticated requests can include a bearer token to access protected endpoints.

### 6. 🗂️ My Uploaded Notes

Users can view and manage the notes they have uploaded.

The implemented management workflow includes:

- Viewing personal uploads.
- Editing supported note information.
- Deleting personal uploads.

Server-side authorization should ensure users can modify only the resources they are permitted to manage.

### 7. 🖼️ Profile Management

The application includes a profile page and profile-related API functionality.

Profile functionality is intended to let users manage their account information. Profile updates and avatar uploads depend on the relevant backend endpoints and cloud-storage configuration.

### 8. ☁️ Cloud-Based Storage

EduNotes integrates two cloud services:

- **MongoDB Atlas:** Stores application data.
- **Cloudinary:** Stores uploaded files and profile images.

Separating file storage from database metadata helps keep the database focused on structured information.

---

## 🔄 How EduNotes Works

The application follows a client-server architecture.

### Step 1: Student Opens the Application

The React frontend displays the dashboard and available navigation options.

### Step 2: Student Creates an Account or Logs In

The frontend sends the user's request to the backend authentication API.

The backend validates the request and interacts with MongoDB as required.

On successful login, the client receives the authentication response and stores the returned token for subsequent authenticated requests.

### Step 3: Student Browses Academic Resources

The student navigates through courses, branches, years, semesters, and subjects to find relevant materials.

### Step 4: Student Uploads Notes

The frontend submits the note information and file to the backend.

The backend processes the request, handles file storage through Cloudinary where configured, and persists the associated metadata in MongoDB.

### Step 5: Students Access and Manage Resources

The application retrieves available notes and presents them in the interface.

Users can manage their own uploads through the corresponding authenticated endpoints.

### Architecture Diagram

```text
                    ┌────────────────────────┐
                    │       Student          │
                    │   Web Browser          │
                    └────────────┬───────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │    React + Vite        │
                    │     Frontend           │
                    │                        │
                    │ Dashboard              │
                    │ Courses and Notes      │
                    │ Login and Register     │
                    │ Uploads and Profile    │
                    └────────────┬───────────┘
                                 │
                                 │ HTTP / JSON
                                 │ Axios / REST API
                                 ▼
                    ┌────────────────────────┐
                    │   Node.js + Express    │
                    │       Backend          │
                    │                        │
                    │ Authentication         │
                    │ API Routes             │
                    │ Controllers             │
                    │ Middleware              │
                    │ File Upload Handling   │
                    └─────────┬──────────────┘
                              │
                    ┌─────────┴──────────┐
                    │                    │
                    ▼                    ▼
         ┌──────────────────┐  ┌──────────────────┐
         │   MongoDB Atlas  │  │    Cloudinary    │
         │                  │  │                  │
         │ Users            │  │ Uploaded Files   │
         │ Notes Metadata   │  │ Profile Images   │
         │ Application Data │  │                  │
         └──────────────────┘  └──────────────────┘
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Component-based frontend development |
| Vite | Frontend development server and build tooling |
| JavaScript | Application logic |
| HTML and CSS | Structure and styling |
| Tailwind CSS | Utility-first styling, where configured |
| React Router | Client-side navigation |
| Axios | HTTP requests from the frontend |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and backend routing |
| MongoDB Atlas | Cloud-hosted database |
| Mongoose | MongoDB object modeling |
| Cloudinary | Cloud file and image storage |
| Multer | Handling multipart file uploads |
| bcryptjs | Password hashing |
| JSON Web Token | Token-based authentication |
| Nodemailer | Email delivery integration |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| Git and GitHub | Version control and source hosting |

*The table describes the technologies used or configured in the project. Exact versions and the status of individual integrations can be verified in the package manifests and application code.*

---

## 🏗️ Application Architecture

EduNotes separates frontend presentation from backend business logic.

### Frontend

The frontend is responsible for:

- Rendering pages and reusable UI components.
- Managing client-side navigation.
- Collecting user input.
- Sending HTTP requests to the backend.
- Displaying API responses and errors.
- Storing the authentication token returned by the login flow.

### Backend

The backend is responsible for:

- Defining API routes.
- Validating and processing requests.
- Authenticating users.
- Enforcing authorization on protected operations.
- Interacting with MongoDB through Mongoose.
- Processing file uploads.
- Integrating with Cloudinary.

### Database and File Storage

MongoDB stores structured application information, while Cloudinary handles supported uploaded assets.

This architecture keeps the application modular and makes it easier to maintain or extend individual components.

---

## 📁 Project Structure

The repository is organized into separate frontend and backend applications.

```text
EduNotes/
│
├── client/                         # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── authApi.js           # Authentication and profile requests
│   │   │   └── noteApi.js            # Notes API requests
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RecentNotes.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StatsCards.jsx
│   │   │
│   │   ├── data/
│   │   │   ├── courses.js
│   │   │   ├── notes.js
│   │   │   └── subjects.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Branches.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyUploadedNotes.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Semesters.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── UploadNotes.jsx
│   │   │   └── Years.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Node.js + Express backend
│   ├── config/
│   │   ├── cloudinary.js            # Cloudinary configuration
│   │   └── db.js                    # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   └── noteController.js        # Notes business logic
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        # Authentication middleware
│   │   ├── profileUpload.js         # Profile image upload handling
│   │   └── uploadMiddleware.js      # Note upload handling
│   │
│   ├── models/
│   │   ├── Note.js                  # Note data model
│   │   └── User.js                  # User data model
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication routes
│   │   └── noteRoutes.js            # Notes routes
│   │
│   ├── utils/
│   │   └── sendEmail.js             # Email utility
│   │
│   ├── server.js                    # Backend entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

*This tree highlights the known project files. Your local repository may contain additional configuration files or slightly different filenames.*

---

## ⚙️ Getting Started

Follow these steps to run EduNotes locally.

### Prerequisites

Install the following tools before starting:

- [Node.js and npm](https://nodejs.org/)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account, or another compatible MongoDB deployment
- A [Cloudinary](https://cloudinary.com/) account for cloud file storage

You should be comfortable running commands in a terminal.

### 1. Clone the Repository

```bash
git clone https://github.com/karangururani/EduNotes.git
```

Navigate to the project directory:

```bash
cd EduNotes
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Backend Environment Variables

Create a file named `.env` inside the `server/` directory.

```text
EduNotes/
└── server/
    ├── .env
    ├── server.js
    └── package.json
```

Add the required environment variables as explained in the next section.

**Never commit your `.env` file or share its secret values publicly.**

### 4. Install Frontend Dependencies

Open another terminal at the project root and run:

```bash
cd client
npm install
```

### 5. Configure the Frontend API URL

The production frontend must send API requests to the deployed backend rather than to `localhost`.

The current authentication API client uses a configurable production URL pattern. If your source code uses `import.meta.env.VITE_API_URL`, create a `client/.env` file containing:

```env
VITE_API_URL=http://localhost:5000/api
```

Use the corresponding production backend URL in Vercel's environment-variable settings.

If your current frontend source uses a different variable name, configure that existing variable consistently rather than introducing a second API configuration mechanism.

Vite environment variables are embedded into the frontend build. Rebuild or redeploy the frontend after changing them.

---

## 🔐 Environment Variables

The backend requires environment variables for its external services and application configuration.

Create `server/.env` and configure the variables required by your actual source code.

### Core Variables

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the backend, if configured |
| `MONGO_URI` | MongoDB connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `JWT_SECRET` | Secret used to sign and verify JWTs, if this is the name used by the authentication code |

Example template:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

JWT_SECRET=your_long_random_secret
```

**Important:** The actual JWT environment-variable name must match the one referenced by your backend. For example, if the authentication controller uses `process.env.JWT_SECRET`, set `JWT_SECRET`. If it uses `process.env.JWT_SECRET_KEY` or another name, configure that exact name instead.

Likewise, configure any email-related variables required by `server/utils/sendEmail.js` and the password-reset implementation.

The values above are placeholders, not working credentials.

### MongoDB Atlas

1. Create a database user in MongoDB Atlas.
2. Obtain the connection string for your cluster.
3. Set the database name in the connection string if needed.
4. Configure network access so the deployed backend can connect.
5. Save the connection string as `MONGO_URI`.

### Cloudinary

1. Open your Cloudinary console.
2. Locate the cloud name and API credentials.
3. Configure the three Cloudinary variables listed above.
4. Keep the API secret private.

### Production Configuration

For deployment, configure environment variables in the hosting provider's dashboard rather than uploading a local `.env` file to GitHub.

After changing backend environment variables, restart or redeploy the backend if required.

---

## ▶️ Running the Application

Start the backend and frontend in separate terminals.

### Start the Backend

From the `server/` directory:

```bash
npm run dev
```

If the development script is unavailable, use:

```bash
npm start
```

The backend should start on the configured port, commonly `5000` during local development.

Check the terminal for database connection errors or missing environment variables.

### Start the Frontend

From the `client/` directory:

```bash
npm run dev
```

Vite will print the local development URL. The default is commonly:

```text
http://localhost:5173
```

Open the URL in your browser.

### Verify the Connection

To verify the full application:

1. Confirm that the backend starts without errors.
2. Confirm that MongoDB connects successfully.
3. Open the frontend.
4. Register a test account.
5. Log in using that account.
6. Inspect the browser's Network tab to check API requests.
7. Test upload and notes-management functionality.
8. Check backend logs if an API request fails.

A successful frontend deployment does not automatically mean that the backend, database, and authentication are all working correctly.

---

## 🔌 API Overview

The Express backend exposes API routes for authentication and note management.

The deployed API base URL is:

```text
https://edunotes-551m.onrender.com/api
```

The exact endpoints and request formats should be confirmed against `server/routes/` and `server/controllers/`.

### Authentication API

The authentication client uses the following endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Register a user |
| `POST` | `/api/auth/login` | Authenticate a user |
| `PUT` | `/api/auth/profile` | Update profile details |
| `POST` | `/api/auth/profile/avatar` | Upload a profile image |

Protected endpoints require the authorization token expected by the backend.

Example request header:

```http
Authorization: Bearer <your_jwt_token>
```

### Notes API

The notes API is implemented through the notes routes, controller, and frontend API client.

Depending on the specific route definitions, the API supports operations related to:

- Retrieving notes.
- Uploading notes.
- Managing a user's uploads.
- Editing note information.
- Deleting notes.
- Recording or retrieving download-related information, where implemented.

For exact HTTP methods, endpoint paths, required fields, and response formats, inspect:

```text
server/routes/noteRoutes.js
server/controllers/noteController.js
client/src/api/noteApi.js
```

The frontend and backend must use matching endpoint paths and request formats.

---

## 🗄️ Database Overview

EduNotes uses MongoDB with Mongoose models.

### User Model

The user model represents registered accounts.

Typical responsibilities include storing user information and authentication-related data.

The actual schema is defined in:

```text
server/models/User.js
```

### Note Model

The note model represents uploaded academic resources.

It can associate note metadata with its uploader and the stored file, depending on the schema.

The actual schema is defined in:

```text
server/models/Note.js
```

### Data Relationships

Conceptually:

```text
User
 │
 │ uploads
 ▼
Note
 │
 ├── Note information
 ├── Uploader reference
 └── Stored file reference
```

The precise fields, references, validation rules, and indexes are determined by the Mongoose schemas.

MongoDB stores the application records, while Cloudinary stores uploaded assets. The database can retain a file URL or other file reference so that the application can retrieve the associated asset.

---

## ☁️ Deployment

EduNotes uses separate hosting for the frontend and backend.

| Component | Hosting | Responsibility |
|---|---|---|
| Frontend | Vercel | Serves the React application |
| Backend | Render | Runs the Express API |
| Database | MongoDB Atlas | Stores application data |
| File Storage | Cloudinary | Stores uploaded assets |

### Frontend Deployment

The frontend is deployed on Vercel.

Repository:

https://github.com/karangururani/EduNotes

Typical frontend build configuration:

| Setting | Value |
|---|---|
| Root directory | `client` |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

Configure the frontend API URL using the environment-variable name expected by the source code.

### Backend Deployment

The backend is deployed on Render.

Typical backend configuration:

| Setting | Value |
|---|---|
| Root directory | `server` |
| Build command | `npm install` |
| Start command | `npm start` |

Add the required MongoDB, Cloudinary, JWT, email, and other configuration variables in Render's environment settings.

### Production Checklist

Before considering the deployment production-ready, verify that:

- [ ] The backend starts successfully.
- [ ] MongoDB Atlas is connected.
- [ ] Required environment variables are configured.
- [ ] The frontend points to the deployed backend.
- [ ] Registration works.
- [ ] Login and JWT generation work.
- [ ] Protected API requests are authorized correctly.
- [ ] Note uploads and cloud storage work.
- [ ] Notes can be retrieved and managed.
- [ ] CORS permits the intended frontend origin.
- [ ] Password-reset and email functionality work if enabled.
- [ ] No secrets or private user information are written to public logs.
- [ ] Error handling is appropriate for production.

---

## 🔒 Security Considerations

Security is an important part of any application that handles user accounts and uploaded files.

EduNotes uses or is designed around the following security mechanisms:

- **Password hashing:** `bcryptjs` is used for password hashing.
- **JWT authentication:** JSON Web Tokens support authenticated requests.
- **Protected routes:** Authentication middleware can restrict access to protected API operations.
- **Environment variables:** Database credentials and API secrets should be kept outside source control.
- **Cloud storage credentials:** Cloudinary secrets must remain on the server.
- **File-upload handling:** Uploaded files should be validated for permitted types and sizes.
- **Authorization:** Users should only be able to modify resources they are authorized to manage.

### Production Recommendations

Before opening the application to the public:

1. Verify authorization checks on every protected endpoint.
2. Validate and sanitize incoming request data.
3. Restrict upload types and file sizes.
4. Avoid logging passwords, tokens, credentials, or unnecessary personal information.
5. Configure CORS for the intended frontend origin.
6. Add appropriate rate limiting to authentication endpoints.
7. Ensure password-reset tokens expire and cannot be reused.
8. Review dependency vulnerabilities and update packages when appropriate.
9. Test the application against common authentication and file-upload attacks.

These are security checks and recommendations, not a claim that every measure has already been implemented.

---

## 🛣️ Future Improvements

EduNotes can be extended with additional features to make academic collaboration more effective.

Potential improvements include:

- [ ] **Advanced Search:** Search and filter notes by subject, semester, branch, and other metadata.
- [ ] **Ratings and Reviews:** Let students rate the usefulness of study materials.
- [ ] **Bookmarks:** Save important notes for quick access.
- [ ] **Content Moderation:** Report inappropriate, copyrighted, or misleading uploads.
- [ ] **Admin Dashboard:** Manage users, uploaded content, and reports.
- [ ] **Official Syllabus Integration:** Map courses and subjects to verified university syllabi.
- [ ] **AI-Powered Study Assistant:** Summarize uploaded notes and generate revision questions.
- [ ] **Personalized Recommendations:** Suggest resources based on students' interests.
- [ ] **Notifications:** Notify users about relevant new materials.
- [ ] **Automated Testing:** Add unit and integration tests for the frontend and backend.
- [ ] **CI/CD Improvements:** Automate checks and deployments through a continuous integration workflow.
- [ ] **Accessibility Improvements:** Improve keyboard navigation, screen-reader support, and responsive design.

These items describe possible future development and should not be interpreted as existing functionality.

---

## 🧪 Testing

Testing helps ensure that changes do not break existing functionality.

Recommended test areas include:

| Area | What to Verify |
|---|---|
| Registration | Valid requests create accounts; invalid requests are rejected |
| Login | Correct credentials authenticate; incorrect credentials are rejected |
| Authorization | Protected routes reject missing or invalid tokens |
| Notes | Notes can be retrieved and associated with the correct uploader |
| Uploads | Invalid file types and oversized files are rejected |
| Editing | Users cannot modify other users' resources without authorization |
| Deletion | Unauthorized deletion attempts are rejected |
| Database | Database failures are handled gracefully |
| Deployment | Frontend API requests reach the correct backend |

Automated tests should be added as the project evolves. The existence of these recommendations does not imply that a complete automated test suite is already available.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the affected functionality.
5. Commit your changes with a descriptive message.
6. Open a pull request explaining what changed and why.

Example:

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Please avoid committing credentials, environment files, personal information, or unrelated generated files.

---

## 👨‍💻 Author

**Karan Gururani**

B.Tech Computer Science and Engineering student interested in full-stack development and practical software engineering.

- **GitHub:** [@karangururani](https://github.com/karangururani)
- **Project Repository:** [EduNotes](https://github.com/karangururani/EduNotes)
- **Live Demo:** [EduNotes Web Application](https://edu-notes-pi.vercel.app/)

---

## 📄 License

No license has been specified in this README.

If you intend to make EduNotes an open-source project, consider adding a `LICENSE` file to the repository. Choose a license that matches how you want others to use, modify, and distribute your code.

---

<div align="center">

### 🎓 EduNotes — Learn Together. Grow Together.

**Built to make academic resource sharing simpler.**

If you find this project useful, consider giving the repository a ⭐ on GitHub.

</div>
