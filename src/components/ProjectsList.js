import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveProjects,
    deleteAllProjects, deleteProject,
} from "../actions/projects";

import { Link } from "react-router-dom";
import AddProject from "./AddProject";

const ProjectsList = () => {
    const [currentProject, setCurrentProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveProjects());
    }, [dispatch]);

    const refreshData = () => {
        setCurrentProject(null);
        setCurrentIndex(-1);
    };

    const setActiveProject = (project, index) => {
        setCurrentProject(project);
        setCurrentIndex(index);
    };

    const removeProject = () => {
        dispatch(deleteProject(currentProject.id))
            .then(() => {
                setCurrentProject(null);
                setCurrentIndex(-1);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeAllProjects = () => {
        dispatch(deleteAllProjects())
            .then(response => {
                console.log(response);
                refreshData();
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <h4>Projects List</h4>
                <ul className="list-group">
                    {projects &&
                    projects.map((project, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveProject(project, index)}
                            key={index}
                        >
                            {project.name}
                        </li>
                    ))}
                </ul>
                <button
                    className="my-3 btn btn-danger"
                    onClick={removeAllProjects}
                >
                    Remove All
                </button>
                <AddProject />
            </div>
            <div className="col-md-8">
                {currentProject ? (
                    <div>
                        <h4 className="d-inline align-bottom">Project</h4>
                        <Link
                            to={"/projects/" + currentProject.id}
                            className="btn btn-primary d-inline mx-3 btn-sm align-baseline"
                        >
                            Edit
                        </Link>
                        <button className="btn btn-danger d-inline btn-sm align-baseline" onClick={removeProject}>
                            Delete
                        </button>
                        <div className="m-3">
                            <div className="row">
                                <label>
                                    <strong className="mx-3">ID : </strong>{currentProject.id}
                                </label>
                            </div>
                            <div className="row">
                                <label>
                                    <strong className="mx-3">Name : </strong>{currentProject.name}
                                </label>
                            </div>
                        </div>
                        <div className="m-3">
                            <div className="row">
                                <label>
                                    <strong className="mx-3">Tasks</strong>
                                </label>
                            </div>
                            <div className="row mx-3">
                                {currentProject.tasks &&
                                currentProject.tasks.map((task, index) => (
                                    <div className="my-2 row" key={index}>
                                        <label>
                                            <strong className="mx-3">ID : </strong>{task.id}
                                        </label>
                                        <label>
                                            <strong className="mx-3">Name : </strong>{task.name}
                                        </label>
                                        <label>
                                            <strong className="mx-3">Description : </strong>{task.description}
                                        </label>
                                        <label>
                                            <strong className="mx-3">Completed : </strong>
                                            <div className={"align-middle d-inline-block status-dot " + (task.completed ? "bg-success" : "bg-secondary")}/>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Project...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsList;
