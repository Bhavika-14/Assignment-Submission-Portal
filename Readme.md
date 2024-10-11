# Assignment Submission Portal

## Setup

```bash
    npm install
```

### Create a .env File:

In the root directory, create a file named .env and add the following variables:
- MONGO_URI=<MongoDB URI>
- JWT_SECRET=<JWT Secret>

### Start the Server:
```bash
    node app.js
```

The server will run on http://localhost:5000.

## API Endpoints

### Register User or Admin:

- Endpoint: POST /register
- Request Body:
{
  "Name": " User1",
  "Email": "user1@example.com",
  "Password": "password123",
  "Role": "User"  // or "Admin"
}

### Login User or Admin:

- Endpoint: POST /login
- Request Body:
{
  "Email": "user1@example.com",
  "Password": "password123"
}

### Fetch All Admins:

- Endpoint: GET /admins
- Headers: Authorization: Bearer <token> (obtained from Login request)

### Upload Assignment:

- Endpoint: POST /upload
- Headers: Authorization: Bearer <token> (obtained from Login request)
- Request Body:
{
  "AdminId": "admin id"
  "Task": "Task1"
}

### Admin Views Assignments:

- Endpoint: GET /assignments
- Headers: Authorization: Bearer <token> (obtained from Login request)

### Admin Accepts Assignment:

- Endpoint: POST /assignments/:id/accept    (assignment Id, obtained from get assignments request)
- Headers: Authorization: Bearer <token> (obtained from Login request)

### Admin Rejects Assignment:

- Endpoint: POST /assignments/:id/reject  (assignment Id, obtained from get assignments request)
- Headers: Authorization: Bearer <token> (obtained from Login request)
