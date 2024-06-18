# Blog-App

A full-stack Blog application built with Next.js on the frontend and Node.js, Express.js, and MongoDB on the backend.

## Features
- Frontend: Next.js for server-side rendering and a seamless user experience.
- Backend: Node.js and Express.js for a robust API, with MongoDB for data storage.

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB
- Nodemon

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Blog-App.git
    cd Blog-App
    ```

2. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

3. Install backend dependencies:
    ```bash
    cd ../backend
    npm install
    ```

4. Create a `.env` file in the `backend` folder with the following keys:
    ```
    SECRET_KEY=your_secret_key
    MONGODB_URI=your_mongodb_uri
    SALT_ROUNDS=your_salt_rounds
    ```

5. Start the application (this will start both the backend and frontend servers):
    ```bash
    npm run go
    ```

### Configuration

Ensure your MongoDB server is running and accessible. Update the MongoDB connection string and other environment variables in the `.env` file as needed.

## Usage

Once both servers are running, you can access the blog app in your web browser at `http://localhost:3000`. The frontend runs on the default Next.js port (3000), and the backend runs on port 8000.
