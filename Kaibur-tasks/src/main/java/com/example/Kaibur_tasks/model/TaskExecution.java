package com.example.Kaibur_tasks.model;

import java.util.Date;

public class TaskExecution {
    
    private Date startTime;
    private Date endTime;
    private String output;

    // Default constructor
    public TaskExecution() {}

    // Constructor with parameters
    public TaskExecution(Date startTime, Date endTime, String output) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.output = output;
    }

    // Getters and Setters
    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    // Optional: Override toString for better readability in logs, etc.
    @Override
    public String toString() {
        return "TaskExecution{" +
                "startTime=" + startTime +
                ", endTime=" + endTime +
                ", output='" + output + '\'' +
                '}';
    }
}
