import React, {useState, useEffect} from 'react';
import { format } from 'path';
import logo from './logo.svg';
import './App.css';

let form = new FormData();
const API = 'http://taskmaster-newenv.us-west-2.elasticbeanstalk.com/api/v1/tasks';
//const API = 'http://localhost:5000/api/v1/tasks';

function _handleChange(event) {
  event.preventDefault();
  let value = event.target.files ? event.target.files[0] : event.target.value;
  form.set(event.target.name, value);

}

function App() {
  const [tasks, setTasks] = useState([]);

  function _getTasks() {
    fetch(API)
      .then( data => data.json() )
      .then( fetchedTasks => setTasks(fetchedTasks) );
  }
  function _upload(event, task) {
    event.preventDefault();
    fetch(`${API}/${task.id}/image`, {
      method: "POST",
      mode: 'no-cors',
      body: form
    })
    .then (response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));  
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
                <img src={task.image} alt={task.title}/>
                <form onSubmit={ (e) => _upload(e, task)} action={API+`/${task.id}/image`} method="post" encType="multipart/form-data">
                    <label>
                      <span>Upload image</span>
                      <input onChange={_handleChange} name ="file" type = "file" />
                    </label>
                    <button> Save</button>
                  </form>

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
