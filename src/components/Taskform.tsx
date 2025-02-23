import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';  // Import UUID library
import { Task } from './TaskTypes'; // Import Task type

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const [taskCommand, setTaskCommand] = useState('');

  const handleCreateTask = async () => {
    const taskData: Task = {
      id: uuidv4(),  // Generate a unique id
      name: taskName,
      command: taskCommand,
    };

    try {
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Task creation failed');
      }

      notification.success({
        message: 'Task Created Successfully',
      });
    } catch (error: unknown) {
      // Type assertion to handle 'unknown' error type
      if (error instanceof Error) {
        notification.error({
          message: 'Error Creating Task',
          description: error.message,
        });
      } else {
        // If error is not of type 'Error', handle it generically
        notification.error({
          message: 'Error Creating Task',
          description: 'An unknown error occurred',
        });
      }
    }
  };

  return (
    <Form>
      <Form.Item label="Task Name">
        <Input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter Task Name"
        />
      </Form.Item>

      <Form.Item label="Task Command">
        <Input
          value={taskCommand}
          onChange={(e) => setTaskCommand(e.target.value)}
          placeholder="Enter Task Command"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" onClick={handleCreateTask}>
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
