import { configureStore } from "@reduxjs/toolkit";
import Projects from './reducers/projects';

export default configureStore({
    reducer: {
        projects: Projects,
    },
});
