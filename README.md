# Blogz | MERN Stack Social Network Project

Blogz is a dynamic MERN stack social network application. Its React frontend, powered by Jest, React Testing Library, and MaterialUI, delivers a seamless user experience with a dark mode theme option.

The UI offers clear views for Blogs and Users, managed by Redux for smooth state handling.

On the backend, Node and Express manage routes for user actions like blog creation, updates, and deletion, along with commenting and liking. User data is securely stored in MongoDB with Mongoose.

Integration testing with Supertest ensures robust APIs, and user authentication relies on JWT and Bcrypt. Comprehensive end-to-end testing is implemented using Cypress. Blogz aims to provide a secure and engaging platform for users to connect and share their thoughts and passions.

# Screenshots

![](blogz-preview.gif)

# Demo

To trial the application simply [click here.](https://blogz.dev) and use the following credentials:

Username: **demo**  
Password: **demo**

# Tech Stack

## Frontend:

- Blogz features a React frontend written in JavaScript, providing a clean user experience.
- Frontend unit testing is ensured with Jest and React Testing Library, ensuring reliability and stability.
- The application boasts a polished and modern UI, achieved using MaterialUI components with the added perk of a dark mode theme for a personalized touch.
- With various views for Blogs and Users, Blogz offers a simple and intuitive interface for easy navigation and engagement.
- Redux is implemented for efficient state management, enabling smooth interactions and data handling.

## Backend:

- Powering Blogz is a Node and Express backend that skillfully handles various routes, including retrieving, creating, updating, and deleting blogs, as well as user registration, login, commenting, and liking functionalities.
- MongoDB with Mongoose serves as the database, efficiently storing Users and Blogs data with a structured schema.
- For a well-rounded development process, the backend is subjected to thorough integration testing using Supertest, ensuring reliable API endpoints.
- User Authentication is prioritized and enforced with JWT (JSON Web Tokens) and Bcrypt, bolstering security and safeguarding user information.

## End to End Testing:

- Blogz takes quality assurance seriously and incorporates Cypress for comprehensive end-to-end testing, ensuring a robust and bug-free application.

## Installation

To install and run this project locally please do the following:

Change directory to the frontend folder and run the following command. Do the same with the backend folder:

```bash
  npm install
```

Register an account with [MongoDB Atlas](https://www.mongodb.com/atlas/database) and set up a database with adequate user credentials, store the details for the database, default port and secret for bcrypt as follows:

```
MONGODB_URI="Your Mongo DB URI"
PORT=3003
SECRET="Any secure string for hashing the passwords can go here"
```

## Run Locally

Clone the project and change directory to the backend folder. Run the following command, doing the same for the frontend shortly after:

```
npm start
```

In the requests folder found within backend, execute the following REST request to create a user in the database so that you can login to application. Replace credentials as appropriate.

```JSON
post http://localhost:3003/api/users
Content-Type: application/json

{
    "username": "testuser",
    "name": "Test User",
    "password": "test123"
}
```

Visit [http://localhost:3000](http://localhost:3000) once you have completed the above steps.

# Build

To deploy this project you will need to create a production build and find an adequate server environment, the latter of which is out of the scope of this readme.

## Available Build Commands

**Building the User Interface (UI)**

Create a production-ready build of the frontend and copy it to the backend.

```bash
npm run build:ui
```

Deploying the Full Application

**Build the UI and push the changes to the main branch of the repository.**

```bash
npm run deploy:full
```

**Starting the Production Server**

```bash
npm start
```

**Starting the Test Server**

```bash
npm run start:test
```

** Starting the Development Server **

```bash
npm run dev
```

![Logo](blogz-logo.png)
