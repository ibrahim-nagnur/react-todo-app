import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTasks = [{ title: newTask, completed: false }, ...tasks];
    setTasks(newTasks);
    setNewTask('');
  };

  const toggleTask = (taskParam) => {
    const index = tasks.findIndex(task => task === taskParam);
    if (index === -1) {
      return;
    }
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], completed: !newTasks[index].completed };
    setTasks(newTasks);
  };


  const deleteTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1 className='heading'>Todo List</h1>
      <input
        className='form-input'
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button className="addNewButton" onClick={addTask}>Add Task</button>
      <div>
        <button className="button" onClick={() => setFilter('all')}>All</button>
        <button className="button" onClick={() => setFilter('completed')}>Completed</button>
        <button className="button" onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul className='task-list-container'>
        {filteredTasks.map((task, index) => (
          <li className="task-item" key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span className="taskList"
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.title}
            </span>
            <button className="deleteButton" onClick={() => deleteTask(index)}><i class="material-icons">delete</i></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
