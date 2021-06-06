import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateTaskStatus, retrieveProjects, createTask} from "../actions/projects";

const Project = (props) => {
    const initialProjectState = {
        id: null,
        name: "",
        tasks: []
    };
    const [currentProject, setCurrentProject] = useState(initialProjectState);


    const initialTaskState = {
        id: null,
        name: "",
        description: "",
        completed: false
    };
    const [task, setTask] = useState(initialTaskState);

    const projects = useSelector(state => state.projects);
    const dispatch = useDispatch();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTask({...task, [name]: value});
    };

    const saveTask = () => {
        dispatch(createTask(currentProject.id, task))
            .then(() => {
                newTask();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTask = () => {
        setTask(initialTaskState);
    };

    useEffect(() => {
        dispatch(retrieveProjects());
        const data = projects.find((project) => project.id.toString() === props.match.params.id);
        setCurrentProject(data);
        if (data === undefined)
            props.history.push("/projects");
    }, [dispatch, projects, props.match.params.id, props.history]);

    const updateContent = (tid) => {
        dispatch(updateTaskStatus(currentProject.id, tid))
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <div>
                <h4 className="d-inline align-bottom">Project Details</h4>
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
                            <div className="my-2 col-12 col-md-6 row" key={index}>
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
                                    <button className={"btn btn-sm text-white " + (task.completed ? "bg-success" : "bg-secondary")}
                                            onClick={ () => {updateContent(task.id)}}>toggle</button>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-0">
                <div className="col-4">
                    <div className="form-group mb-3">
                        <label htmlFor="title">Task Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                            value={task.name}
                            onChange={handleInputChange}
                            name="name"
                        />
                        <label htmlFor="title">Task Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={task.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveTask} className="btn btn-success">
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Project;
