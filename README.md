# Social Media Feed App

A simple social media feed application where users can view posts, create new posts, and see a list of users. Built with React and Axios, communicating with a backend API.

## Live Demo

Try it live: [https://social-media-fbit.vercel.app/](https://social-media-fbit.vercel.app/)

## GitHub Repo

Source code available: [https://github.com/prabhu543/Social-Media.git](https://github.com/prabhu543/Social-Media.git)

## Stack Used

- **Frontend:**
  - React.js
  - Axios (for HTTP requests)
  - Tailwind CSS
- **Backend:** (API server hosted separately)
  - REST API endpoint: `https://social-media-xi-roan.vercel.app/api`

## Setup Instructions

1. **Clone the repo**

git clone https://github.com/prabhu543/Social-Media.git
cd frontend


2. **Install dependencies**

Ensure you have Node.js installed. Then run:

npm install


3. **Configure environment**

For backend configuration:

- Create a `.env` file inside the `backend/api/` directory.
- Add your MongoDB connection URL and the port number, for example:

  ```
  MONGODB_URI=your-mongodb-connection-string
  PORT=5000
  ```

4. **Run the backend server**

Open terminal, navigate to the backend folder, and start the server (assuming `nodemon` is installed):

cd backend/api
nodemon index.js

5. **Run the frontend**

In another terminal window, navigate to the frontend folder and start the React development server:

cd frontend
npm run dev


6. **Access the app**

Open your browser and go to:

## Notes

- The backend API must be running and accessible for the frontend to function properly.
- User authentication relies on storing `userId` in `localStorage`.
- Creating posts requires login; otherwise, users are redirected to the login page.
- Tailwind CSS is used for styling, and can be customized via the config or classes.

---

Feel free to update URLs if you host or deploy somewhere else. Let me know if you'd like me to help create this as a `.md` file!  

