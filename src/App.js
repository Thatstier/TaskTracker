import './App.css';
import React from 'react';

const Task = ({id, taskname, description, completed}) => (
  <div className = "taskinfo">
    <div className="id">№{id}</div>
    <div>Task: {taskname}</div>
    <div>Description: {description}</div>
    <div className="status">{completed}</div>
    <br></br>
    <button className="someButton" key={id} onClick={() => {
      console.log("Task " + id + " completion status = " + completed)
    }}>Change status</button>
    <hr></hr>
  </div>
)


class myToDoList extends React.Component {
  state = {
    tasks: [
      {
        id: 1,
        name: 'Check mail',
        description: 'Open your gmail and check for updates',
        completed: false
      },
      {
        id: 2,
        name: 'Find metamask',
        description: 'Search for metamask browser extension in google',
        completed: true
      },
      {
        id: 3,
        name: 'Install',
        description: 'Install metamask',
        completed: true
      },
      {
        id: 4,
        name: 'Set up',
        description: 'Set up your wallet',
        completed: true
      },
      {
        id: 5,
        name: 'Funding',
        description: 'Fund your wallet',
        completed: false
      }
    ]
  }
  render()
  {
    return (
      <div>
        <h1>You've got some things to do, buddy</h1>
        {this.state.tasks.map(it => 
        <Task id={it.id}
              taskname={it.name} 
              description={it.description} 
              completed={it.completed} />
        )}
      </div>
    )  
  }
}

export default myToDoList;
