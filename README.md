# Edufy

Edufy is comprehensive web application designed to manage quizzes, announcements, and courses while providing a user-friendly interface for both administrators and instructors.

## Features

### Quiz Management

- **Two Quiz Modes:** Supports both Multiple Choice Questions (MCQ) and Written Questions.
- **Timer:** A 5-minute timer for quizzes. No answers are accepted after the timer expires.
- **MCQ Evaluation:** Automatically evaluates MCQ answers and displays correct answers along with the score.
- **Written Quiz:** Stores written answers for manual evaluation and displays "Marks will be published later."
- **Dynamic Content:** Quiz questions are fetched dynamically based on the selected course.

### Announcement Management

- **Form:** Allows users to post announcements with the following details:
  - Announcement Type: Course Related, Quiz, or Exam.
  - Announcement Date: Automatically set to the current date.
  - Announcement Text.
- **User Roles:** Separate announcement views for Admins and Instructors.
- **Three-Column Layout:** Displays announcements by type (Course Related, Quiz, Exam).
- **Responsive Design:** Adapts layout for various screen sizes.

### Instructor Management

- Displays instructor details such as name and courses taught.
- Includes a default avatar for instructors without a profile picture.

### Footer

- **Follow Us Section:** Social media links (Facebook, LinkedIn, GitHub, Twitter, Instagram).
- **Resources Section:** Links to "About Us," "FAQ," "Privacy Policy," and "Terms of Service."
- **Contact Section:** Email and phone contact details.
- **Responsive Design:** Fully optimized for different screen sizes.

## Technologies Used

### Frontend

- **React**: Core framework for building the user interface.
- **React Router DOM**: For routing and navigation.
- **Tailwind CSS**: For responsive and modern styling.
- **React Icons**: For social media icons.
- **SweetAlert2**: For beautiful alert popups.

### Backend

- **Node.js**: Runtime environment.
- **Express.js**: Backend framework for handling routes and APIs.
- **MongoDB**: Database for storing application data.

### Additional Packages

- **date-fns**: For date formatting and manipulation.

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- MongoDB (running locally or on a cloud provider)
- Git

### Steps to Clone and Run

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_API_URL=https://edufy-server.vercel.app
   ```

4. **Start the Application**

   - **Frontend**: Run the following command:
     ```bash
     npm start
     ```
   - **Backend**: Navigate to the `backend` folder and run:
     ```bash
     node server.js
     ```

5. **Open the Application**
   Open your browser and navigate to `https://edufy-server.vercel.app`.

## Developer Info

- **Name:** [Md. Anwar Hossain]
- **Email:** [ranakrphone@gmail.com]
- **GitHub:** [https://github.com/ranak8811](https://github.com/ranak8811)
- **LinkedIn:** [https://www.linkedin.com/in/ranak8811/](https://www.linkedin.com/in/ranak8811/)

## Backend Code

The backend code is located in the `backend` folder of the project. It handles:

- User authentication and authorization.
- API endpoints for managing quizzes, announcements, and courses.
- Data storage and retrieval using MongoDB.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/your-database
   JWT_SECRET=your-jwt-secret
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```

## Future Collaboration

We welcome contributions to improve this project. Here are some ways you can help:

1. **Feature Enhancements:** Add new features like analytics, notifications, or real-time collaboration.
2. **Bug Fixes:** Report and fix issues.
3. **UI/UX Improvements:** Improve the responsiveness and design.
4. **Documentation:** Enhance the README or add detailed usage guides.

To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

# Website Live Preview

**Hosted on Firebase** : https://edufy-cse470.web.app/

---

**Backend Code Repository** : https://github.com/ranak8811/Edufy-server-CSE470
