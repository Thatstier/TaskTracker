import React from 'react';
import './Task.css';

const Task = (props) => (
            <div  className="taskinfo">
                <div>Task: {props.task.name}</div>
                <div>Description: {props.task.description}</div>
                <div>Done: {props.task.completed.toString()}</div>
                <br></br>
                <button className = "statusButton" onClick={props.changeStatus}>{props.task.message}</button>
                <br></br>
                <br></br>
                <hr></hr>
            </div>

)
export default Task;
