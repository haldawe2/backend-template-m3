# Project's name REST API
## Description

This is a the backend repository for the React application `app's name`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

### User

Users in the database have the following properties:

```js
{
  "username": String,
  "email": String,
  "hashedPassword": String
}
```

Tasks in the database have the following properties:

```js
{
  name: {
    type: String,
    required: true
  },
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true
  },
  status: {
    type: String,
    enum: ["complete", "in progress", "to do", "pending"],
    default: "to do"
  },
  notes: {
    type: String
  },
  color: {
    type: String
  },
  tags: [{
    type: String
  }],
  plannedStartDate: {
    type: Date,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  plannedEndDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  dependencies: [{
    type: mongoose.Types.ObjectId,
    ref: "Dependency"
  }],
  workers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  links: [{
    type: String
  }]
},
  {
    timestamps: true
  }
```

---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |
| POST create task | POST | /api/v1/tasks/create | { name, project, status, notes, color, tags, startDate, endDate, dependencies, workers, links } | Private |
| DELETE task | DELETE | /api/v1/tasks/delete/:taskId | | Private |

---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

