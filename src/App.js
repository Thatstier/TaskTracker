import React from 'react';
import styles from './App.module.scss';
import classnames from 'classnames/bind';
import { DEFAULT_THEME, ThemeContext } from "./ThemeContext";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Project from "./components/Project";
import ProjectsList from "./components/ProjectsList";
import Redirect from "react-router-dom/es/Redirect";

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
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
            <Link to={"/projects"} className="nav-link">
                Projects
            </Link>
            </li>
        </div>
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
                <Switch>
                <Route exact path={["/", "/projects"]} component={ProjectsList} />
                <Route path="/projects/:id" component={Project} />
                <Redirect from='*' to='/projects' />
                </Switch>
            </ThemeContext.Provider>
        </div>
        </BrowserRouter>
        )
    }
}

export default App;
