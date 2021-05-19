import React from 'react';
import Task from '../ShowTasks/Task';
import AddTask from '../AddTask/AddTask';
import styles from './ToDoList.module.scss';

class ToDoList extends React.Component {
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
            description: 'Search for metamask browser extension',
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

    addTask = ({name, description}) => {
        const task = {
            id: this.state.tasks.length+1,
            name: name,
            description: description,
            completed: false
        }
        this.setState({tasks: [...this.state.tasks, task]})
    }

    changeStatus = (id) => {
      const newTasks = this.state.tasks.map(it => {
          if (it.id === id) {
              it.completed = !it.completed
          }
          return it})

      this.setState({tasks:newTasks})
    }

    render() {
      return (
        <div>
              <div className={styles.content}>
                  {this.state.tasks.map(it => <Task class={styles.input} 
                    id={it.id}
                    name={it.name}
                    description={it.description}
                    completed={it.completed}
                    index={this.state.tasks.findIndex((element) => element.id === it.id)}
                    onChangeTask={this.changeStatus}
                  />)}

              </div>
              <AddTask class={styles.input} handleClick={this.addTask}/>
          </div>
        )
    }
}

export default ToDoList;
