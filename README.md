# **Kaibur Tasks - Spring Boot & MongoDB Application**

## **Project Overview**

The **Kaibur Tasks** application allows users to manage tasks and execute shell commands within a Kubernetes pod environment. The application provides a REST API that lets users:

- **Create**, **retrieve**, **update**, and **delete** tasks.
- **Search** tasks by name.
- **Execute shell commands** stored in tasks and store the execution results.

All tasks are stored in a **MongoDB** database.

---

## **Technologies Used**

- **Spring Boot**: A Java framework for building RESTful APIs.
- **MongoDB**: A NoSQL database for storing task data.
- **Maven**: A build and dependency management tool.
- **cURL/Postman**: Tools for testing API endpoints.

---

## **Features**

- **Task CRUD Operations**: Create, Read, Update, Delete tasks.
- **Task Execution**: Run shell commands and store the results as task executions.
- **Search Tasks by Name**: Find tasks based on their name.

---

## **Project Structure**


### **1. Controller Directory** (`controller/`)
This directory contains the API controllers for handling requests.

- **TaskController.java**: Handles CRUD operations for tasks.
- **TaskExecutionController.java**: Handles execution-related operations for tasks.

### **2. Model Directory** (`model/`)
This directory contains the data models used by the application.

- **Task.java**: Defines the Task object, with fields like `id`, `name`, `owner`, `command`, and `taskExecutions`.
- **TaskExecution.java**: Defines the TaskExecution object, with fields like `startTime`, `endTime`, and `output`.

### **3. Repository Directory** (`repository/`)
This directory contains MongoDB repositories that handle database operations.

- **TaskRepository.java**: Provides methods to interact with the `tasks` collection in MongoDB, including search functionality.

### **4. Service Directory** (`service/`)
This directory contains the business logic and interactions with the database.

- **TaskService.java**: Contains methods for creating, updating, deleting tasks, and executing shell commands.
- **TaskExecutionService.java**: Contains methods for managing task execution, such as saving output and execution time.

---

## **Setup and Installation**

### **1. Prerequisites**

Before you begin, ensure you have the following installed:

- **Java 17+**: Ensure you have Java 17 or later installed. You can verify by running:
  ```bash
  java -version
MongoDB: Install MongoDB locally or use a remote MongoDB instance. Make sure MongoDB is running on localhost:27017.

Maven: Ensure Maven is installed. You can verify by running:

```
mvn -verion

```

## Clone the Repository
 Clone the repository to your local machine:

  ```
  git clone https://github.com/yourusername/kaibur-tasks.git

  ```
## Build and Run the Application
  After cloning the repository, navigate to the project directory and build the project using Maven:

  ```
  cd kaibur-tasks

  mvn clean install # on successfull build og JAR file

  mvn spring-boot:run

  ```
The application will start running on http://localhost:8080.

##  MongoDB Setup
Ensure MongoDB is running on your local machine or update the connection URI in the application.properties file.

For a local instance, the default configuration will be: in src/resource/application-properties.

```
  spring.data.mongodb.uri=mongodb://localhost:27017/taskdb
```

## output 

  ``
    ![image](https://github.com/user-attachments/assets/ffb35d09-39e3-4591-8981-30261390f1b4)


## List of end-points 

  1. GET tasks (Fetch All Tasks)
    To fetch all tasks from MongoDB:
```
    curl -X GET http://localhost:8080/tasks
```
![image](https://github.com/user-attachments/assets/ba98321c-cf82-416c-b742-3c1a8b6e3dd6)

  2. GET task by ID (Fetch Task by ID)
```
  curl -X GET http://localhost:8080/tasks/123

```
  ![image](https://github.com/user-attachments/assets/e3b95fe7-3390-40ab-a0b8-20fdd98532f9)

  3. PUT a new Task (Create or Update a Task)
    To create or update a task, pass a JSON object with task details.
```
curl -X PUT http://localhost:8080/tasks -H "Content-Type: application/json" -d '{
    "id": "129",
    "name": "Print Hello",
    "owner": "Hemanth Naidu Bugatha",
    "command": "echo Hello World!"
}'
```
![image](https://github.com/user-attachments/assets/3979da0f-3dea-4618-a12a-5e5a42e2c2c7)

4. Delete a task by its id:
  ```
  curl -X DELETE http://localhost:8080/tasks/123

  ```
   ![image](https://github.com/user-attachments/assets/d79c6da6-ba7d-4ec1-a23d-5e3f1c0ce5e2)

5. GET tasks by name (Search Tasks by Name)
    To find tasks that contain the string "Print" in their name:

   ```
   curl -X GET "http://localhost:8080/tasks/search?name=Print"
   ```

6.PUT a TaskExecution (Execute a Shell Command)
    To execute a shell command stored in the task with ID "123" and store the execution result in the taskExecutions list:

```
curl -X PUT http://localhost:8080/tasks/123/execute
```

  ![image](https://github.com/user-attachments/assets/020fc626-4aa3-4d0d-ad86-a60dce1533c8)
