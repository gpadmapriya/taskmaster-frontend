import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

const API = 'http://taskmaster-newenv.us-west-2.elasticbeanstalk.com/api/v1/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks) );
  }

  useEffect( _getTasks, [] );

  return (
    <div className="app">
      <nav>
        <h3>Task Master</h3>
      </nav>
      <main>
      <ul>
        {tasks.map( (task,idx) => {
          return (
            <li key={task.id}>
              <details>
                <summary>
                  <span>Task Title: {task.title}</span>
                  <div> Description: {task.description} Assignee: {task.assignee}</div>
                </summary>

                <History history={task.history} />

              </details>
            </li>
          )
        })}
      </ul>
      </main>
    </div>
  );
}

function History(props) {
  return (
    <ol>
      {props.history.map( (record,idx) => {
        return (
          <li key={idx}>
            <span>Task status: {record.action} on {record.date}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default App;
