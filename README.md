# Task Manager API

A simple RESTful API for managing tasks with full CRUD operations, input validation, and error handling.

## Overview

This project is a Node.js Express application that provides a complete task management system. The API allows you to create, read, update, and delete tasks with proper validation and error handling. Tasks are stored in memory and initially loaded from a `task.json` file.

## Features

- ✅ Full CRUD operations for tasks
- ✅ Input validation for required fields
- ✅ Error handling for invalid requests
- ✅ RESTful API design
- ✅ Comprehensive test suite
- ✅ In-memory data storage with JSON file initialization

## Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Installation

1. Clone or download the project to your local machine
2. Navigate to the project directory:
   ```bash
   cd airtribe-engineering-learners-task-manager-api-task-manager
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the server:
   ```bash
   node app.js
   ```
2. The server will start on port 3000
3. You should see the message: `Server is listening on 3000`

### Running Tests

To run the test suite:
```bash
npm test
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Task Schema
```json
{
  "id": 2,
  "title": "Create a new project",
  "description": "Create a new project using Magic",
  "completed": false
}
```

---

### 1. GET /tasks - Retrieve All Tasks

**Description**: Returns a list of all tasks.

**Method**: `GET`

**URL**: `/tasks`

**Success Response**:
- **Status Code**: 200 OK
- **Body**: Array of task objects

**Example Request**:
```bash
curl http://localhost:3000/tasks
```

**Example Response**:
```json
[
  {
    "id": 1,
    "title": "Set up environment",
    "description": "Install Node.js, npm, and git",
    "completed": true
  },
  {
    "id": 2,
    "title": "Create a new project",
    "description": "Create a new project using Magic",
    "completed": false
  }
]
```

---

### 2. GET /tasks/:id - Retrieve Specific Task

**Description**: Returns a single task by its ID.

**Method**: `GET`

**URL**: `/tasks/:id`

**Parameters**:
- `id` (integer): The ID of the task to retrieve

**Success Response**:
- **Status Code**: 200 OK
- **Body**: Task object

**Error Responses**:
- **400 Bad Request**: Invalid task ID
- **404 Not Found**: Task not found

**Example Request**:
```bash
curl http://localhost:3000/tasks/1
```

**Example Response**:
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

---

### 3. POST /tasks - Create New Task

**Description**: Creates a new task with the provided data.

**Method**: `POST`

**URL**: `/tasks`

**Required Fields**:
- `title` (string): Non-empty title for the task
- `description` (string): Non-empty description of the task

**Optional Fields**:
- `completed` (boolean): Task completion status (defaults to `false`)

**Success Response**:
- **Status Code**: 201 Created
- **Body**: Created task object

**Error Responses**:
- **400 Bad Request**: Validation failed or invalid input

**Example Request**:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express.js",
    "description": "Complete Express.js tutorial",
    "completed": false
  }'
```

**Example Response**:
```json
{
  "id": 16,
  "title": "Learn Express.js",
  "description": "Complete Express.js tutorial",
  "completed": false
}
```

**Validation Examples**:
```bash
# Invalid: Missing required fields
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'
# Response: 400 Bad Request

# Invalid: Empty title
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "", "description": "Valid description"}'
# Response: 400 Bad Request

# Invalid: Invalid completed type
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Valid", "completed": "true"}'
# Response: 400 Bad Request
```

---

### 4. PUT /tasks/:id - Update Task

**Description**: Updates an existing task with the provided data.

**Method**: `PUT`

**URL**: `/tasks/:id`

**Parameters**:
- `id` (integer): The ID of the task to update

**Optional Fields**:
- `title` (string): Non-empty title for the task
- `description` (string): Non-empty description of the task
- `completed` (boolean): Task completion status

**Success Response**:
- **Status Code**: 200 OK
- **Body**: Updated task object

**Error Responses**:
- **400 Bad Request**: Invalid task ID or validation failed
- **404 Not Found**: Task not found

**Example Request**:
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task Title",
    "completed": true
  }'
```

**Example Response**:
```json
{
  "id": 1,
  "title": "Updated Task Title",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

---

### 5. DELETE /tasks/:id - Delete Task

**Description**: Deletes a task by its ID.

**Method**: `DELETE`

**URL**: `/tasks/:id`

**Parameters**:
- `id` (integer): The ID of the task to delete

**Success Response**:
- **Status Code**: 200 OK
- **Body**: Deleted task object

**Error Responses**:
- **400 Bad Request**: Invalid task ID
- **404 Not Found**: Task not found

**Example Request**:
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

**Example Response**:
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true
}
```

---

## Testing the API

### Using Postman

1. Import the following collection into Postman:
```json
{
  "info": {
    "name": "Task Manager API",
    "description": "Collection for testing Task Manager API endpoints"
  },
  "item": [
    {
      "name": "Get All Tasks",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/tasks"
      }
    },
    {
      "name": "Get Task by ID",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/tasks/1"
      }
    },
    {
      "name": "Create Task",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/tasks",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"title\": \"New Task\", \"description\": \"Task description\", \"completed\": false}"
        }
      }
    },
    {
      "name": "Update Task",
      "request": {
        "method": "PUT",
        "url": "http://localhost:3000/tasks/1",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"title\": \"Updated Task\", \"completed\": true}"
        }
      }
    },
    {
      "name": "Delete Task",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/tasks/1"
      }
    }
  ]
}
```

### Using curl Commands

You can test all endpoints using the curl commands provided in each endpoint section above.

### Running the Test Suite

The project includes a comprehensive test suite using `tap` and `supertest`. To run all tests:

```bash
npm test
```

The test suite covers:
- ✅ Creating tasks with valid and invalid data
- ✅ Retrieving all tasks and individual tasks
- ✅ Updating tasks with valid and invalid data
- ✅ Deleting tasks
- ✅ Error handling for non-existent resources

## Error Handling

The API provides proper error responses with appropriate HTTP status codes:

- **400 Bad Request**: Invalid input data, validation errors, or malformed requests
- **404 Not Found**: Requested task does not exist
- **500 Internal Server Error**: Server-side errors (should not occur in normal operation)

Error responses include descriptive error messages:
```json
{
  "error": "Validation failed",
  "details": ["Title is required and must be a non-empty string"]
}
```

## Project Structure

```
airtribe-engineering-learners-task-manager-api-task-manager/
├── app.js                 # Main application file with API endpoints
├── package.json           # Project dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── task.json             # Initial task data
├── test/
│   └── server.test.js    # Test suite
└── README.md             # This documentation file
```

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **tap**: Test framework
- **supertest**: HTTP assertion library for testing

## License

ISC License
