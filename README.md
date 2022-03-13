# FullstackTodo-App
Mongodb mongoose Nodejs Express Reactjs

**Task-App client**

**task-manager server side**

## Todo Application
# task-manager
BackEnd was made with Nodejs express and local mongodb database
You can make tasks for yourself and the app will list them.
You can filter the tasks by its status, whether its completed or not.
You can modify or delete existing tasks
User authentication
## RestApi
### user
POST "url/users"  -- Create User Used when ur registering for the first time

POST "url/login"  -- Logging in generates JWT token which is stored in localstorage and database

GET "url/me"  -- Reads profile with the stored token in the localstorage **(Requires Authentication to access)** 

POST "url/logout"  -- Logs out from the App and deletes the token from local storage and database **(Requires Authentication to access)**

POST "url/logoutAll --Logs out from all devices deletes all tokens stored in database **(Requires Authentication to access)**

PATCH "url/me" --Updates users data **(Requires Authentication to access)**

### tasks

POST "url/tasks"  --Creates tasks and links it to a specific user  **(Requires Authentication to access)**

GET "url/tasks" -- Gets all tasks **(Requires Authentication to access)**

GET "url/tasks?completed" --Gets all tasks based on its status wether its ongoing or completed **(Requires Authentication to access)**

PATCH "url/tasks/:id"  -- Updates a specific task **(Requires Authentication to access)**

DELETE "url/tasks/:id" -- Deletes the task from the database **(Requires Authentication to access)**
