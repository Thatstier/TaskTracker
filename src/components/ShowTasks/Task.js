import React from 'react';
import styles from './Task.module.scss';
import classnames from 'classnames/bind';
import {ThemeContext} from "..//..//ThemeContext";

const cx = classnames.bind(styles)

const Task = React.memo(({task, changeCompletedStatus}) => {
    return (
    <ThemeContext.Consumer> 
      { theme => (
            <div className={cx("container",`container-theme-${theme}`)}>
                <div class={cx("id", `id-theme-${theme}`)}>{task.id}</div>
                <div class={styles.name}>Task name: {task.name}</div>
                <div>Details: {task.description}</div>
                <div>
                  <button className={cx("changeStatusButton",
                  `changeStatusButton-color-${task.completed}-${theme}`)} onClick={() => changeCompletedStatus()}>
                  {task.completed.toString()}</button>
                </div>
                <hr></hr>
            </div>
          )}
    </ThemeContext.Consumer>
    )
 }
)

export default Task;
