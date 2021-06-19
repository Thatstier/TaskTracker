import React from 'react';
import Task from '../ShowTasks/Task';
import AddTask from '../AddTask/AddTask';
import styles from './ToDoList.module.scss';
import classNames from 'classnames/bind';
import { ThemeContext } from '../../ThemeContext';
import { BrowserRouter, Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles)

const projects = [
  {
    id: 1, name: "project1", tasks: [
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
      }
    ]
  },

  {
   id: 2, name: "project2", tasks: [
    {
      id: 1,
      name: 'Check mail2',
      description: 'Open your gmail2',
      completed: false
    },
    {
      id: 2,
      name: 'Find metamask',
      description: 'Search for metamask browser2',
      completed: true
    }
   ]
  }
]

const normalizestate = (projectArray) => {
  const normalizedState = {projectsbyId:{}, tasksbyId:{}}

  var counter = 0
  for (var i = 0; i < projectArray.length; i++) {
    const tasks = []
    for (var j = 0; j < projectArray[i].tasks.length; j++) {
      tasks.push(counter)
      normalizedState.projectsbyId = {...normalizedState.projectsbyId, [i]:{}}
      normalizedState.projectsbyId[i] = {id: projectArray[i].id, name: projectArray[i].name}
      normalizedState.tasksbyId = {...normalizedState.tasksbyId, [counter]:{}}
      normalizedState.tasksbyId[counter] = {id: projectArray[i].tasks[j].id, name: projectArray[i].tasks[j].name, 
        description: projectArray[i].tasks[j].description, completed: projectArray[i].tasks[j].completed}
        counter++;
    }
    normalizedState.projectsbyId[i]={...normalizedState.projectsbyId[i], tasks}
  }
  return normalizedState
}

const { projectsbyId, tasksbyId } = normalizestate(projects)

const Project = (doubleobj) => { 
  return (
  <div>
    <div className={cx("proj")}>
      <Link to={`/projects/${doubleobj.doubleobj.id}`}>{doubleobj.doubleobj.name}</Link>
    </div>
  </div>
  )
}

const Tasks = ({match, projects, tasks, changeCompletedStatus, handlechange, thisstatename, thisstatedescription, addChange}) => { 
  
  if (!Object.keys(projects).includes(String(match.params.id-1))) {
    return <Redirect to="/" />
  }
  
  return(
    <ThemeContext.Consumer>
      { (theme) =>
    <div>
      <h3>Let's do this</h3>
      <div className={cx("tablebody")}>
      {projects[match.params.id-1].tasks.map(i => <Task task = {tasks[i]} changeCompletedStatus={() =>changeCompletedStatus(i)} />)}
        <div className={cx("butt", `butt-theme-${theme}`)}>
            <div><AddTask value={thisstatename || ''} onChange={handlechange} name="name" /></div>
            <div><AddTask value={thisstatedescription || ''} onChange={handlechange} name="description" /></div>
            <div><button className={cx("add-button", `add-button-theme-${theme}`)} onClick={() => addChange(match.params.id-1)}>Add task</button></div>
        </div>
      </div>

      <div className = {cx("back-button")}><Link to= "/">Back</Link></div>
    </div>
  }
  </ThemeContext.Consumer>
  ) 
}

const WrappedTasks = withRouter(Tasks);

class ToDoList extends React.Component {
  state = {
      projectsbyId,
      tasksbyId
  }

  handlechange = (event) => {
    const { value, name } = event.currentTarget
    this.setState({[name]: value})
  }

  changeCompletedStatus = (taskId) => {
    const oldTask = this.state.tasksbyId[taskId]
    const newTask = {...oldTask, completed: !oldTask.completed}

    this.setState(currentState => ({
      tasksbyId: {
        ...currentState.tasksbyId,
        [taskId]: newTask
      }
    }))
  }

  addProjectChange = () => {
    if (typeof this.state.pname !== 'undefined' && this.state.pname !=='') {
    this.setState({projectsbyId: {...this.state.projectsbyId, 
      [Object.keys(this.state.projectsbyId).length]: {id: Object.keys(this.state.projectsbyId).length+1, name: this.state.pname, tasks:[] } }})
    this.setState({pname: ''})
    }
  }


  addChange = (projId) => {
    const taskId = Object.keys(this.state.tasksbyId).length+1
    const newId = this.state.projectsbyId[projId].tasks.length+1

    this.setState({tasksbyId: {...this.state.tasksbyId, [taskId]:{id:newId, name: this.state.name, description:this.state.description, completed: false} }})

    const oldProj = this.state.projectsbyId[projId]
    const newProj = {...oldProj, tasks: [...oldProj.tasks, taskId]}

    this.setState({projectsbyId: {...this.state.projectsbyId, [projId]: newProj }})
    this.setState({name: ''})
    this.setState({description: ''})
  }

  render() {
    return (
      <BrowserRouter>
      <Switch>
      <Route exact path = "/">
      <ThemeContext.Consumer>
        { (theme) =>
        <div className={cx("table")}>
          <h1>Projects</h1>
          <div className={cx("head")}>
            <div className={cx("row", `row-theme-${theme}`)}>
          </div>
        </div>
        <div className={cx("tablebody")}>
          {Object.values(this.state.projectsbyId).map(obj => <Project doubleobj = {obj} ></Project>)}
          <div><AddTask value={this.state.pname || ''} onChange={this.handlechange} name="pname" /></div>
          <div className={cx("butt", `butt-theme-${theme}`)}><button className={cx("add-button", `add-button-theme-${theme}`)}onClick={this.addProjectChange}>New project</button></div>
        </div>
        </div>
      }
      </ThemeContext.Consumer>
        </Route>
        <Route path = "/projects/:id">
          <WrappedTasks projects={this.state.projectsbyId} tasks={this.state.tasksbyId} changeCompletedStatus={this.changeCompletedStatus} 
          handlechange={this.handlechange} thisstatename={this.state.name} thisstatedescription={this.state.description} addChange={this.addChange} />
        </Route>

        <Redirect to="/" />
        </Switch>
        </BrowserRouter>
        )
    }
}

export default ToDoList;
