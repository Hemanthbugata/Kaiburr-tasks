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

src/ ├── main/ │ ├── java/ │ │ └── com/ │ │ └── example/ │ │ └── Kaibur_tasks/ │ │ ├── controller/ # API Controllers │ │ │ ├── TaskController.java │ │ │ └── TaskExecutionController.java │ │ ├── model/ # Task and TaskExecution Models │ │ │ ├── Task.java │ │ │ └── TaskExecution.java │ │ ├── repository/ # MongoDB Repositories │ │ │ └── TaskRepository.java │ │ └── service/ # Business Logic │ │ ├── TaskService.java │ │ └── TaskExecutionService.java │ ├── resources/ │ │ └── application.properties # MongoDB Configuration ├── pom.xml # Maven Dependencies
