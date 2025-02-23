import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';

const TaskSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:8080/tasks?name=${searchQuery}`);
    const data = await response.json();
    setTasks(data);
  };

  return (
    <div>
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search Task by Name"
      />
      <Button type="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Search
      </Button>
      <Table
        dataSource={tasks}
        rowKey="id"
        columns={[
          { title: 'Task Name', dataIndex: 'name', key: 'name' },
          { title: 'Command', dataIndex: 'command', key: 'command' },
        ]}
      />
    </div>
  );
};

export default TaskSearch;
