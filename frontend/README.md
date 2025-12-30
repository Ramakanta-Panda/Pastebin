# Pastebin-Lite Frontend

This is the React-based frontend for the Pastebin-Lite application. It connects to the Node.js/Express backend to store and retrieve pastes.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB

## Backend Setup (Prerequisite)

Before running the frontend, ensure the backend is running to handle API requests.

1.  Navigate to the backend folder:
    ```bash
    cd ../backend
    ```
2.  Install dependencies and start the server:
    ```bash
    npm install
    npm start
    ```
3.  The backend should be running at `http://localhost:5000`.

## Frontend Setup

1.  **Install Dependencies**
    Make sure you are in the `frontend` directory:
    ```bash
    npm install
    ```

2.  **Configuration**
    If your backend is running on a different port than 5000, you may need to configure the API URL in a `.env` file:
    ```env
    VITE_API_BASE_URL=http://localhost:5000
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will typically run at `http://localhost:5173`.
