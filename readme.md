# MongoDB-Node-Express To Do
A CRUD operation with MongoDB, Node, Express without mongoose

## Getting Started
you need to edit .env file with your DB URL, replace **YOUR_CONNECTION_URL** with proper url
once done, simple run
```
npm install
npm run server
```

# API Usage and Endpoints for Task

## Add a new task [POST /api/tasks]
- Request: Add Task
    - Headers
        Content-Type: application/json

    - Body
        {
            "title": "Task Title",
            "description": "Task Description",
            "startDate": "23/09/2022",
            "dueDate": "23/09/2022",
            "status": "pending",
            "priority": "high"
        }
    
- Response: 201 Created


## Get all tasks [GET /api/tasks]
- Request: Get all tasks
    
- Response: 200 OK
    - Body
        [
            {
                "title": "Task Title",
                "description": "Task Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022",
                "status": "pending",
                "priority": "high"
            }
        ]

## Get a task [GET /api/tasks/:id]
- Request: Get a task

- Response: 200 OK
    - Body
        {
            "title": "Task Title",
            "description": "Task Description",
            "startDate": "23/09/2022",
            "dueDate": "23/09/2022",
            "status": "pending",
            "priority": "high"
        }

## Update a task [PUT /api/tasks/:id]
- Request: Update a task
    - Headers
        Content-Type: application/json

    - Body
        {
            "title": "Task Title",
            "description": "Task Description",
            "startDate": "23/09/2022",
            "dueDate": "23/09/2022",
            "status": "pending",
            "priority": "high"
        }

- Response: 200 OK

## Delete a task [DELETE /api/tasks/:id]
- Request: Delete a task

- Response: 200 OK

## Mark task as done date [PUT api/tasks/markAsDone/:id]
- Request: Mark task as done date
    - Headers
        Content-Type: application/json

    - Body
        {
            "doneDate": "23/09/2022"
        }
    
- Response: 200 OK

## Change task Status [PUT api/tasks/status/:id]
- Request: Change task Status
    - Headers
        Content-Type: application/json

    - Body
        {
            "status": "pending"
        }
    
- Response: 200 OK

## Filter Task by status [GET api/tasks/status/:status]
- Request: Filter Task by status
    
- Response: 200 OK
    - Body
        [
            {
                "title": "Task Title",
                "description": "Task Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022",
                "status": "pending",
                "priority": "high"
            }
        ]

## Search Task by title [GET api/tasks/search/:title]
- Request: Search Task by title

- Response: 200 OK
    - Body
        [
            {
                "title": "Task Title",
                "description": "Task Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022",
                "status": "pending",
                "priority": "high"
            }
        ]

## Sort tasks by start date, due date, done date [GET api/tasks/sort]
- Request: Sort tasks by start date, due date, done date
     - Headers
        Content-Type: application/json
    
    - Body
        {
            "dateType": "startDate",
        }
    
- Response: 200 OK


# API usage and Endpoints for Projects

## Add a new project [POST /api/projects]
- Request: Add Project
    - Headers
        Content-Type: application/json

    - Body
        {
            "title": "Project Title",
            "description": "Project Description",
            "startDate": "23/09/2022",
            "dueDate": "23/09/2022"
        }
    
- Response: 201 Created

## Get all projects [GET /api/projects]
- Request: Get all projects

- Response: 200 OK
    - Body
        [
            {
                "title": "Project Title",
                "description": "Project Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022"
            }
        ]

## Get a project [GET /api/projects/:id]
- Request: Get a project

- Response: 200 OK
    - Body
        {
            "title": "Project Title",
            "description": "Project Description",
            "startDate": "23/09/2022",
            "dueDate": "23/09/2022"
        }

## Update a project [PUT /api/projects/:id]
- Request: Update a project
    - Headers
        Content-Type: application/json

    - Body
        {
            "title": "Project Title",
            "description": "Project Description",
            "startDate": "23/09/2022",
            "dueDate": "23/09/2022"
        }
    
- Response: 200 OK

## Delete a project [DELETE /api/projects/:id]
- Request: Delete a project

- Response: 200 OK

## Get all tasks of a project [GET /api/projects/:id/tasks/]
- Request: Get all tasks of a project

- Response: 200 OK
    - Body
        [
            {
                "title": "Task Title",
                "description": "Task Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022",
                "status": "pending",
                "priority": "high",
                projectId: "5OM3R4ND0M1D"
            }
        ]

## Assign Task to a Project [POST /api/projects/:id/tasks/]
- Request: Assign Task to a Project
    - Headers
        Content-Type: application/json

    - Body
        {
            taskId: "5OM3R4ND0M1D"
        }
    
- Response: 200 OK

## Remove Task from a Project [DELETE /api/projects/:id/tasks/:taskId]
- Request: Remove Task from a Project

- Response: 200 OK

## Filter Task by Project Name [GET /api/projects/:projectName/tasks]
- Request: Filter Task by Project Name

- Response: 200 OK
    - Body
        [
            {
                "title": "Task Title",
                "description": "Task Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022",
                "status": "pending",
                "priority": "high",
                projectId: "5OM3R4ND0M1D"
            }
        ]

## Sort Project by start date, due date [GET /api/projects/sort/:sortBy]
- Request: Sort Project by start date, due date
    - Headers
        Content-Type: application/json

    - Body
        {
            "dateType": "startDate",
        }
    
- Response: 200 OK
    - Body
        [
            {
                "title": "Project Title",
                "description": "Project Description",
                "startDate": "23/09/2022",
                "dueDate": "23/09/2022"
            }
        ]
