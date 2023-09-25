# [FlexCode - Unlock the Power of Problem Solving](https://flex-code-6541d.web.app/)

<p align="center">
  <img src="./public/20230810_120154.png" alt="FlexCode Logo" width="250" height="250">
</p>

FlexCode is an online platform designed to host and manage coding challenges and problem-solving activities for coding enthusiasts, developers, and programmers. This README provides an overview of the project, its key features, technology stack, and how to get started.

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Unique Features](#unique-features)
4. [Technology Stack](#technology-stack)
5. [Project Structure](#project-structure)
6. [Development Plan](#development-plan)
7. [Potential Enhancements](#potential-enhancements)
8. [Creators](#creators)
9. [Conclusion](#conclusion)

## Overview

FlexCode is an online platform designed to host and manage coding challenges and problem-solving activities for coding enthusiasts, developers, and programmers. This platform provides a flexible and interactive environment where participants can showcase their coding skills and solve challenges. FlexCode is built using modern technologies, including React.js for the frontend, Express.js for the backend, Firebase for user authentication, MongoDB with Mongoose for contest data storage, and JWT for secure authentication.


## Key Features

- **User Authentication:** Secure user registration, login, and password reset using Firebase Authentication with JWT integration.
- **Challenge Management:** Admin users can create and manage coding challenges with input, output, and test case specifications.
- **User Dashboard:** Participants can access their user dashboard, view upcoming contests, participation history, and leaderboard rankings.
- **Real-time Submissions:** Participants can submit code solutions, and FlexCode will evaluate, score, and display real-time results.
- **Leaderboard:** The platform displays leaderboard rankings for each contest based on user performance.
- **Code Editor:** A feature-rich code editor with syntax highlighting for writing and submitting code solutions.
- **Blogs:** Users can read and explore programming-related articles.
- **User Counter:** Track the number of users visiting the website.
- **Problem of the Day:** Present a daily coding challenge on an individual section.

## Unique Features

- **Blogs:** Explore programming-related articles.
- **User Counter:** Track the number of users visiting the website.
- **Problem of the Day:** Daily coding challenges to engage users.


## Technology Stack

**Frontend:**
- React.js
- HTML
- CSS
- JavaScript
- Tailwind CSS
- Axios

**Backend:**
- Express.js
- Node.js

**Database:**
- MongoDB with Mongoose

**Authentication:**
- Firebase Authentication with JWT integration

**Code Evaluation:**
- Code Mirror environment for securely executing user-submitted code

**Hosting:**
- Deployment on a cloud platform like Firebase and Vercel

### Here are the main dependencies and devDependencies used in the project:

### Dependencies

| Technology    | Version    |
|---------------|------------|
| bcrypt        | 5.1.1      |
| colors        | 1.4.0      |
| cors          | 2.8.5      |
| dotenv        | 16.3.1     |
| express       | 4.18.2     |
| jsonwebtoken  | 9.0.1      |
| mongoose      | 7.4.3      |
| sslcommerz-lts| 1.1.0      |


## Project Structure

The project is organized into the following components:

- **Frontend Pages**: Home Page, Login, Signup, Dashboard, Contest Details, Code Editor
- **Components**: Navbar, Footer, Contest List, Contest Card, Leaderboard, Count Users, etc.

For user authentication and state management, refer to the optional section in the project structure.

## Development Plan

The development process can be divided into the following milestones:

1. Set up the project structure, create the React.js frontend, and integrate Firebase Authentication for user registration and login.
2. Implement user authentication using JWT, enabling access to specific routes based on user roles (admin, participant).
3. Set up MongoDB for storing contest data, including contest details, challenges, and user submissions.
4. Develop the problem-solving creation and challenge management functionality for admin users.
5. Implement the user dashboard, displaying upcoming problems, participation history, and leaderboard rankings.
6. Create the code editor component for users to write and submit code solutions.
7. Perform thorough testing and debugging of the entire application.
8. Deploy the application to a cloud platform for public access.

## Potential Enhancements

After completing the primary features, consider adding these enhancements:

- **Notifications:** Implement real-time notifications for contest updates and announcements.
- **Code Sharing:** Allow participants to share and discuss their solutions.
- **Code Review:** Introduce a code review feature for feedback on solutions.

## Creators

Meet the DevGenius team behind FlexCode:

- [Imam Hossain (Team Lead)](https://github.com/ihshadin)
- [Mehedi Hasan Foysal](https://github.com/mehedihasan8)
- [Abu Sayeed](https://github.com/studentabusayeed)
- [Omar Faruq](https://github.com/OmarFaruq967)
- [Jahid Hasan Zarif](https://github.com/Jahidmorol)
- [Nur Mohammad Chowdhury](https://github.com/nmcsakib)


## Conclusion

FlexCode is an exciting problem-solving website built with React.js, Firebase, MongoDB, Mongoose, JWT, and Express.js. The platform aims to provide a flexible and interactive environment for coding enthusiasts to participate in problem-solving challenges. Throughout the development process, prioritize user experience, data security, and scalability to deliver a robust and user-friendly platform. Happy coding!


