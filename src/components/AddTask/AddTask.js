import React from 'react';
import shortid from 'shortid';
import './AddTask.css';

class AddTask extends React.Component {
    state = {
        name: '',
        description: ''
    }

    handleChange = (event) => {
        const {value, name} = event.currentTarget
        const newState = {...this.state.buttons, [name]: value}
        this.setState(newState)
    }
    
    handleSubmit = (event) =>{
        this.props.onSubmit({
            name: this.state.name,
            description: this.state.description,
            completed: false,
            id: shortid.generate(),
            message: "Mark as completed"
        })
        this.setState({
            name: '',
            description: ''
        })
    }
    render() {
        return (
            <div className = "addTask" onSubmit={this.handleSubmit}>
                <input className = "input" 
                       name="name"
                       value={this.state.name}
                       onChange={this.handleChange}
                       placeholder="Enter task name"
                />
                <input className = "input" 
                       name="description"
                       value={this.state.description}
                       onChange={this.handleChange}
                       placeholder="Enter short description"
                />
                <button className="submitButton" onClick={this.handleSubmit}>Add new task</button>
                <hr></hr>
            </div>
        )
    }
}
export default AddTask;
