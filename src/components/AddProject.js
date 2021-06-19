import React, {useState} from "react";
import {createProject} from "../actions/projects";
import {useDispatch} from "react-redux";

const AddProject = () => {
    const initialProjectState = {
        id: null,
        name: "",
        tasks: []
    };
    const [project, setProject] = useState(initialProjectState);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const {name, value} = event.target;
        setProject({...project, [name]: value});
    };

    const saveProject = () => {
        dispatch(createProject(project.name))
            .then(() => {
                newProject();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newProject = () => {
        setProject(initialProjectState);
    };

    return (
        <div className="mx-0">
            <div>
                <div className="form-group mb-3">
                    <label htmlFor="title">Project Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={project.name}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <button onClick={saveProject} className="btn btn-success">
                    Add Project
                </button>
            </div>
        </div>
    );

};

export default AddProject;
