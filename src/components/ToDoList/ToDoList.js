import React from 'react';
import Task from '../ShowTasks/Task';
import AddTask from '../AddTask/AddTask';
import './ToDoList.css';

class ToDoList extends React.Component {
    state = {
        tasks: [
          {
            id: 1,
            name: 'Check mail',
            description: 'Open your gmail and check for updates',
            completed: false,
            message: 'Mark as completed'
          },
          {
            id: 2,
            name: 'Find metamask',
            description: 'Search for metamask browser extension in google',
            completed: true,
            message: 'Mark as incompleted'
          },
          {
            id: 3,
            name: 'Install',
            description: 'Install metamask',
            completed: true,
            message: 'Mark as incompleted'
          },
          {
            id: 4,
            name: 'Set up',
            description: 'Set up your wallet',
            completed: true,
            message: 'Mark as incompleted'
          },
          {
            id: 5,
            name: 'Funding',
            description: 'Fund your wallet',
            completed: false,
            message: 'Mark as completed'
          }
        ]
      }

    addTask = (task) => {
        const updatedTasks = [task, ...this.state.tasks]
        this.setState({ tasks: updatedTasks })
    }

    changeStatus = (id) => {
        this.setState({
            tasks: this.state.tasks.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        completed: !task.completed,
                        message: task.message === "Mark as completed" ? "Mark as incompleted" : "Mark as completed"
                    }
                } else {
                    return task
                }
            }),
        })
    }

    render() {
        return (
            <main>
                <h1>You've got some things to do, buddy!</h1>
                <div>
                    <AddTask onSubmit={this.addTask}/>
                </div>
                {this.state.tasks.map(task => (
                    <Task
                      task={task}
                      changeStatus={() => this.changeStatus(task.id)}
                    />))}
            </main>
        )
    }
}

export default ToDoList;
