import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import TaskForm from './components/Taskform';
import TaskList from './components/TaskList';
import TaskSearch from './components/Tasksearch';
import CommandExecution from './components/CommandExecution';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('tasks');

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['tasks']}>
          <Menu.Item key="tasks" onClick={() => setSelectedPage('tasks')}>Tasks</Menu.Item>
          <Menu.Item key="create" onClick={() => setSelectedPage('create')}>Create Task</Menu.Item>
          <Menu.Item key="search" onClick={() => setSelectedPage('search')}>Search Task</Menu.Item>
          <Menu.Item key="execute" onClick={() => setSelectedPage('execute')}>Execute Command</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px' }}>
        {selectedPage === 'tasks' && <TaskList />}
        {selectedPage === 'create' && <TaskForm />}
        {selectedPage === 'search' && <TaskSearch />}
        {selectedPage === 'execute' && <CommandExecution />}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Kaibur Tasks ©2025</Footer>
    </Layout>
  );
};

export default App;
