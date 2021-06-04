import React from 'react';
import styles from './AddTask.module.scss';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

const AddTask = ({value, onChange, name, theme}) => {
    return(
    <div className={cx("container", `container-theme-${theme}`)}>
    <input placeholder = "Enter something..." className={cx("input")} value={value} onChange={onChange} name={name}/>
    </div>
    )
  }

export default AddTask;
