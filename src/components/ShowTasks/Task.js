import React from 'react';
import styles from './Task.module.scss';
import classnames from 'classnames/bind';
import {ThemeContext} from "..//..//ThemeContext";

const cx = classnames.bind(styles)

const Task = (props) => {
    return (
    <ThemeContext.Consumer> 
      { theme => (
            <div className={cx("container",`container-theme-${theme}`)}>
                <div class={cx("id", `id-theme-${theme}`)}>{props.id}</div>
                <div class={styles.name}>Task name: {props.name}</div>
                <div>Details: {props.description}</div>
                <div>
                  <button className={cx("changeStatusButton",
                  `changeStatusButton-color-${props.completed}-${theme}`)} onClick={() => {
                    props.onChangeTask(props.id)
                  }}>{props.completed.toString()}</button>
                </div>
                <hr></hr>
            </div>
          )}
    </ThemeContext.Consumer>
    )
 }
 export default Task;
