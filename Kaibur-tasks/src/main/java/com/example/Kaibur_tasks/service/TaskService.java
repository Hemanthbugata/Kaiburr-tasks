package com.example.Kaibur_tasks.service;

import com.example.Kaibur_tasks.model.Task;
import com.example.Kaibur_tasks.model.TaskExecution;
import com.example.Kaibur_tasks.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(String id) {
        return taskRepository.findById(id);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {
        taskRepository.deleteById(id);
    }

    public List<Task> findTasksByName(String name) {
        return taskRepository.findByNameContaining(name);
    }

    /**
     * Executes the task command using ProcessBuilder and logs the output.
     * Adds the execution details to the task's taskExecutions list.
     *
     * @param taskId the task ID to execute
     * @return the TaskExecution details
     * @throws Exception if the task cannot be found or command execution fails
     */
    public TaskExecution executeTaskCommand(String taskId) throws Exception {
        Optional<Task> taskOptional = taskRepository.findById(taskId);
        if (!taskOptional.isPresent()) {
            throw new Exception("Task not found");
        }

        Task task = taskOptional.get();
        String command = task.getCommand();

        // Split the command string into an array of arguments (in case there are spaces in the command)
        String[] commandArray = command.split("\\s+");

        // Start the process using ProcessBuilder
        ProcessBuilder processBuilder = new ProcessBuilder(commandArray);
        processBuilder.redirectErrorStream(true);  // Combine error and output streams

        long startTime = System.currentTimeMillis();
        Process process = processBuilder.start(); // Start the process

        // Capture the command output
        StringBuilder output = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        // Wait for the process to finish and capture the exit code
        int exitCode = process.waitFor();

        long endTime = System.currentTimeMillis();

        // Handle command failure by checking the exit code
        if (exitCode != 0) {
            throw new Exception("Command execution failed with exit code: " + exitCode);
        }

        // Create a new TaskExecution object
        TaskExecution taskExecution = new TaskExecution();
        taskExecution.setStartTime(new Date(startTime));
        taskExecution.setEndTime(new Date(endTime));
        taskExecution.setOutput(output.toString());

        // Add the TaskExecution to the task's taskExecutions list
        task.getTaskExecutions().add(taskExecution);

        // Save the updated task back to MongoDB
        taskRepository.save(task);

        return taskExecution;
    }
}
