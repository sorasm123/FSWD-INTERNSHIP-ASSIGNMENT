# Folder Architect — Student Directory

A project demonstrating proper folder architecture with separated frontend and backend, structured data storage, and API-based data retrieval.

## Project Structure

```
folder-architect/
├── client/                 (Frontend)
│   ├── index.html          Main page
│   ├── style.css           Styles
│   └── script.js           Fetch logic
├── server/                 (Backend)
│   ├── controllers/
│   │   └── userController.js   Data logic
│   ├── routes/
│   │   └── userRoutes.js       Route handling
│   ├── data/
│   │   └── users.json          Sample data
│   └── server.js               HTTP server
├── package.json
└── README.md
```

## How to Run

1. Start the server:
   ```
   npm start
   ```
2. Open `client/index.html` in your browser
3. Click "Load Students" to fetch data from the API

## API Routes

- `GET /` — Welcome message
- `GET /api/users` — All students
- `GET /api/users/:id` — Student by ID
