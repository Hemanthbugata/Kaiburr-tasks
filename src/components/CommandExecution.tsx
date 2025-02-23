import React, { useState } from 'react';
import { Button, Input, notification } from 'antd';

const CommandExecution: React.FC = () => {
  const [command, setCommand] = useState('');
  const [executionResult, setExecutionResult] = useState('');

  const handleExecuteCommand = async () => {
    try {
      const response = await fetch('http://localhost:8080/tasks/task123/execute', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      });

      if (!response.ok) {
        throw new Error('Command execution failed');
      }

      const result = await response.json();
      setExecutionResult(result.output);  // Assuming the response contains the output of the command
      notification.success({
        message: 'Command Executed Successfully',
      });
    } catch (error: unknown) {
      // Type guard: check if the error is an instance of Error
      if (error instanceof Error) {
        notification.error({
          message: 'Error Executing Command',
          description: error.message,  // Safe to access 'message' if it's an instance of Error
        });
      } else {
        // Fallback in case error is not an instance of Error (e.g., network error or other unexpected error)
        notification.error({
          message: 'Error Executing Command',
          description: 'An unknown error occurred',
        });
      }
    }
  };

  return (
    <div>
      <Input.TextArea
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        rows={4}
        placeholder="Enter Command"
      />
      <Button type="primary" onClick={handleExecuteCommand} style={{ marginTop: '10px' }}>
        Execute Command
      </Button>
      {executionResult && <pre>{executionResult}</pre>}
    </div>
  );
};

export default CommandExecution;
