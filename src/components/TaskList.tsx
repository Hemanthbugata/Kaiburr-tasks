import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Task } from './TaskTypes'; // Import Task type

const TaskList: React.FC = () => {
  // Define state with type Task[]
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from the backend
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:8080/tasks');
      const data: Task[] = await response.json();  // Cast data as Task[]
      setTasks(data);  // Set the tasks state
    };
    fetchTasks();
  }, []);

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Task deletion failed');
      }

      // Update state after deletion
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Table
      dataSource={tasks} // TypeScript knows this is an array of Task objects
      rowKey="id"
      columns={[
        { title: 'Task Name', dataIndex: 'name', key: 'name' },
        { title: 'Command', dataIndex: 'command', key: 'command' },
        {
          title: 'Action',
          key: 'action',
          render: (text, record: Task) => (  // Explicitly annotate record as Task
            <Button onClick={() => handleDelete(record.id)} danger>
              Delete
            </Button>
          ),
        },
      ]}
    />
  );
};

export default TaskList;
