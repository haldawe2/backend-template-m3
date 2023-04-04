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
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"]
  },
  hashedPassword: {
    type: String,
    required: [true, "Hashed password is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  surname: {
    type: String,
    required: [true, "Surname is required"]
  },
  profilePicture: {
    type: String
  },
  company: {
    type: String
  },
  availability: {
    type: Number
  }
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
}
```

Workspaces in the database have the following properties:

```js
{
  name: {
    type: String,
    required: [true, "Workspace name required"]
  },
  founder: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Founder required"]
  },
  acronym: {
    type: String
  },
  profilePicture: {
    type: String
  },
  members: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  admins: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }],
  info: {
    type: String
  },
  projects: [{
    type: mongoose.Types.ObjectId,
    ref: "Project"
  }]
}
```

Projects in the database have the following properties:

```js
{
  name: {
    type: String,
    required: [true, "Project name required"]
  },
  workspace: {
    type: mongoose.Types.ObjectId,
    ref: "Workspace",
    required: [true, "Workspace required"]
  },
  founder: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "founder required"]
  },
  info: {
    type: String
  },
  acronym: {
    type: String
  },
  profilePicture: {
    type: String
  },
  startDate: {
    type: Date,
    required: [true, "Start date required"]
  },  
  plannedStartDate: {
    type: Date,
    required: [true, "Planned start date required"]
  },
  endDate: {
    type: Date,
    required: [true, "End date required"]
  },
  plannedEndDate: {
    type: Date,
    required: [true, "Planned end date required"]
  },
  dependencies: [{
    type: mongoose.Types.ObjectId,
    ref: "Dependency"
  }],
  workers: [{
    type: mongoose.Types.ObjectId,
    ref: "User"
  }]
}
```

Dependencies in the database have the following properties:

```js
{
  type: {
    type: String,
    enum: ["finishStart", "startStart", "finishFinish", "startFinish"],
    default: "finishStart"
  },
  firstTask: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
    required: [true, "First task required"]
  },
  secondTask: {
    type: mongoose.Types.ObjectId,
    ref: "Task",
    required: [true, "Second task required"]
  }
}
```


---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| AUTH user sign up    | POST      | /api/v1/auth/signup  | { username, email, password }   |    Public |                 
| AUTH user log in     | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| AUTH check user   | GET     | /api/v1/auth/me    |   | Private |
| USER get user info | GET | /api/v1/:userId | | Private |
| USER update user data | PUT | /api/v1/edit/:userId | { email, password1, password2, name, surname, profilePicture, company, availability } | Private |
| USER delete user | DELETE | /api/v1/delete/:userId | | Private |
| TASKS create task | POST | /api/v1/tasks/create | { name, project, status, notes, color, tags, startDate, endDate, dependencies, workers, links } | Private |
| TASKS delete task | DELETE | /api/v1/tasks/delete/:taskId | | Private |
| TASKS update task | PUT | /api/v1/tasks/edit/:taskId | { name, project, status, notes, color, tags, , plannedStartDate, endDate, plannedEndDate, dependencies, workers, links } | Private |
| TASKS get task info | GET | /api/v1/tasks/:taskId | | Private |
| WORKSPACE create workspace | POST | /api/v1/workspace/create | | Private |
| WORKSPACE get workspace info | GET | /api/v1/workspace/:workspaceId | | Private |
| WORKSPACE get workspaces related to user | GET | /api/v1/workspace/user/:userId | | Private |
| WORKSPACE update workspace | PUT | /api/v1/workspace/edit/:workspaceId | { name, founder, acronym, profilePicture, members, admins, info, projects } | Private |
| WORKSPACE delete workspace | DELETE | /api/v1/workspace/delete/:workplaceId |  | Private |
| PROJECT create project | POST | /api/v1/project/create | { name, workspace, founder, info, acronym, profilePicture, startDate, endDate, dependencies, workers } | Private |
| PROJECT get info | GET | /api/v1/workspace/:workspaceId | | Private |
| PROJECT update | PUT | /api/v1/project/edit/:projectId | { name, workspace, founder, info, acronym, profilePicture, startDate, plannedStartDate, endDate, plannedEndDate, dependencies, workers } | Private |
| PROJECT delete | DELETE | /api/v1/project/delete/:projectId | | Private |
| DEPENDENCY create | POST | /api/v1/dependency/create | { type, firstTask, secondTask } | Private |
| DEPENDENCY get info | GET | /api/v1/dependency/:dependencyId | | Private |
| DEPENDENCY edit info | PUT | /api/v1/dependency/edit/:dependencyId | { type, firstTask, secondTask } | Private |
| DEPENDENCY delete | DELETE | /api/v1/dependency/delete/:dependencyId | | Private |


---

## Useful links

- [Presentation slides]()
- [Frontend repository]()
- [Frontend deploy]()
- [Deployed REST API]()

