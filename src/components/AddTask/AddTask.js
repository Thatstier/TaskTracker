import React from 'react';
import styles from './AddTask.module.scss';
import classnames from 'classnames/bind';
import { ThemeContext } from '../../ThemeContext';

const cx = classnames.bind(styles);

class AddTask extends React.Component {
    state = {
        name: '',
        description: ''
    }

    handleChange = (event) => {
        const {value, name} = event.currentTarget
        const newState = {[name]: value}
        this.setState(newState)
    }
    
    render() {
        return (
        <ThemeContext.Consumer>{
           theme => ( 
          <div className={cx("container", `container-theme-${theme}`)}>
                <div>
                    Task name:
                    <input placeholder = "Enter task name" className={cx("input")} value={this.state.name} name="name" onChange={this.handleChange}/>
                </div>
                <div>
                    Description:
                    <input placeholder = "Enter task description" className={cx("input2")} value={this.state.description} name="description" onChange={this.handleChange}/>
                </div>
                <button className={cx("add-button", `add-button-theme-${theme}`)}
                        onClick={() => {
                            this.props.handleClick(this.state)
                        }}>
                    Add task!
                </button>
            </div>
           )
            }
        </ThemeContext.Consumer>
        )
    }
  }
  export default AddTask;
