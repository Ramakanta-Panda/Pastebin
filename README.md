# 📝 Pastebin-Lite

Pastebin-Lite is a small Pastebin-like web application where users can create text pastes and share a URL to view them.
It supports **time-based expiry (TTL)** and **view-count limits**, with deterministic time handling for automated testing.

This project is built as part of a take-home assignment and is designed to pass automated API tests.

---

## 🚀 Deployed Application

**Frontend (Vercel):**

```
https://your-app.vercel.app
```

**Backend (API):**

```
https://your-backend-url.vercel.app
```

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* React Router
* Tailwind CSS
* Fetch API

### Backend

* Node.js
* Express
* MongoDB Atlas
* Mongoose
* dotenv

---

## 📁 Project Structure

```
Pastebin-Lite/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── healthControllers.js
│   │   └── pasteControllers.js
│   ├── models/
│   │   └── pasteModel.js
│   ├── routes/
│   │   ├── healthRoutes.js
│   │   └── pasteRoutes.js
│   ├── utils/
│   │   └── time.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── CreatePaste.jsx
│   │   │   └── ViewPaste.jsx
│   │   ├── services/
│   │   │   └── pasteApi.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
TEST_MODE=0
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## ▶️ Running Locally

### 1️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend will run on:

```
http://localhost:5000
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 📡 API Endpoints

### ✅ Health Check

```
GET /api/healthz
```

**Response**

```json
{ "ok": true }
```

* Always returns HTTP 200
* Reflects MongoDB connectivity
* Responds quickly

---

### ✏️ Create Paste

```
POST /api/pastes
```

**Request Body**

```json
{
  "content": "string",
  "ttl_seconds": 60,
  "max_views": 5
}
```

**Rules**

* `content` is required and must be non-empty
* `ttl_seconds` ≥ 1 (optional)
* `max_views` ≥ 1 (optional)

**Response**

```json
{
  "id": "string",
  "url": "https://your-app.vercel.app/p/<id>"
}
```

Invalid input returns **4xx** with JSON error.

---

### 📥 Fetch Paste (API)

```
GET /api/pastes/:id
```

**Response**

```json
{
  "content": "string",
  "remaining_views": 4,
  "expires_at": "2026-01-01T00:00:00.000Z"
}
```

* Each successful request counts as **one view**
* `remaining_views` is `null` if unlimited
* `expires_at` is `null` if no TTL

Unavailable cases return:

* **HTTP 404**
* JSON error response

---

### 🌐 View Paste (HTML)

```
GET /p/:id
```

* Returns HTML page containing paste content
* Content is safely escaped (no script execution)
* Returns **404** if expired or view limit exceeded

---

## 🧪 Deterministic Time (Testing Support)

To support automated testing:

* Enable test mode:

```env
TEST_MODE=1
```

* Send time via request header:

```http
x-test-now-ms: 1735689600000
```

When enabled, backend uses this header instead of system time for expiry checks.

---

## 🧠 Design Decisions

* MongoDB chosen for simple persistence and scalability
* TTL and view-limit enforced at read time
* Deterministic time ensures reliable automated tests
* Frontend gracefully falls back to localStorage if backend is unreachable
* HTML rendering escapes unsafe characters

---

## ✅ Assignment Requirements Status

| Requirement         | Status |
| ------------------- | ------ |
| Create paste        | ✅      |
| Shareable URL       | ✅      |
| View paste          | ✅      |
| TTL expiry          | ✅      |
| View count limit    | ✅      |
| Health check        | ✅      |
| Deterministic time  | ✅      |
| Safe HTML rendering | ✅      |

---

## 📜 License

This project is created for evaluation purposes only.
