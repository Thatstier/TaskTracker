import React from 'react';
import styles from './App.module.scss';
import ToDoList from './components/ToDoList/ToDoList';
import classnames from 'classnames/bind';
import { DEFAULT_THEME, ThemeContext } from "./ThemeContext";
import { BrowserRouter } from 'react-router-dom';

const cx = classnames.bind(styles)

class App extends React.Component {

  state = {
      theme: DEFAULT_THEME
    }

  handleThemeChange = event => {
      this.setState({theme: event.target.value})
    }  

  render() {
      return (
        <BrowserRouter>
          <div className={cx("container", `container-theme-${this.state.theme}`)}>
          <h2>You've got some things to do, buddy</h2>
          <div className={cx("radios")}>
            <div className={cx('theme')}>
            <div>
              <input 
                  type="radio"
                  name="theme"
                  id="light"
                  value="light"
                  checked={this.state.theme === "light"}
                  onChange={this.handleThemeChange}
                />
              <label htmlFor="light">Light theme</label>
            </div>
    
            <div>
              <input
                  type="radio"
                  name="theme"
                  id="dark"
                  value="dark"
                  checked={this.state.theme === "dark"}
                  onChange={this.handleThemeChange}
                />
              <label htmlFor="dark">Dark theme</label>
            </div>
          </div>
          </div>
          <ThemeContext.Provider value={this.state.theme}>
            <ToDoList />
          </ThemeContext.Provider>
        </div>
        </BrowserRouter>
        )
    }
}

export default App;
