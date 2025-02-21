package com.example.Kaibur_tasks.controller;

import com.example.Kaibur_tasks.model.Task;
import com.example.Kaibur_tasks.model.TaskExecution;
import com.example.Kaibur_tasks.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getTasks(@RequestParam(required = false) String id, @RequestParam(required = false) String name) {
        if (id != null) {
            Optional<Task> task = taskService.getTaskById(id);
            return task.map(List::of).orElseThrow(() -> new RuntimeException("Task not found"));
        } else if (name != null) {
            List<Task> tasks = taskService.findTasksByName(name);
            if (tasks.isEmpty()) {
                throw new RuntimeException("No tasks found with the given name");
            }
            return tasks;
        } else {
            return taskService.getAllTasks();
        }
    }

    @PutMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable String id) {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/execute")
    public ResponseEntity<TaskExecution> executeTask(@PathVariable String id) {
        try {
            TaskExecution execution = taskService.executeTaskCommand(id);
            return new ResponseEntity<>(execution, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
