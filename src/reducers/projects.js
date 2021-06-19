import {
    CREATE_PROJECT,
    CREATE_TASK,
    RETRIEVE_PROJECTS,
    UPDATE_TASK_STATUS,
    DELETE_PROJECT,
    DELETE_ALL_PROJECTS,
} from '../actions/types';

const initialState = [
    {
        id: 0,
        name: 'My Project 1',
        tasks: [
            {
                id: 1,
                name: 'Check mail 1',
                description: 'Open your gmail and check for updates 1',
                completed: false
            },
            {
                id: 2,
                name: 'Find metamask 1',
                description: 'Search for metamask browser extension 1',
                completed: true
            },
            {
                id: 3,
                name: 'Install 1',
                description: 'Install metamask 1',
                completed: true
            },
            {
                id: 4,
                name: 'Set up 1',
                description: 'Set up your wallet 1',
                completed: true
            },
            {
                id: 5,
                name: 'Funding 1',
                description: 'Fund your wallet 1',
                completed: false
            }
        ]
    },
    {
        id: 1,
        name: 'My Project 2',
        tasks: [
            {
                id: 6,
                name: 'Check mail 2',
                description: 'Open your gmail and check for updates 2',
                completed: false
            },
            {
                id: 7,
                name: 'Find metamask 2',
                description: 'Search for metamask browser extension 2',
                completed: true
            },
            {
                id: 8,
                name: 'Install 2',
                description: 'Install metamask 2',
                completed: true
            },
            {
                id: 9,
                name: 'Set up 2',
                description: 'Set up your wallet 2',
                completed: true
            },
            {
                id: 10,
                name: 'Funding 2',
                description: 'Fund your wallet 2',
                completed: false
            }
        ]
    }
];

function projectReducer(projects = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_PROJECT:
            const id = Math.max.apply(Math, projects.map(p => p.id)) + 1;
            return [...projects, {
                id: id,
                name: payload,
                tasks: []
            }];

        case CREATE_TASK:
            const tid = Math.max.apply(Math, [].concat.apply([], projects.map(p => p.tasks)).map(t => t.id)) + 1;
            payload.data.id = tid
            return projects.map((project) => {
                if (project.id === payload.id) {
                    return {
                        ...project,
                        ...{tasks: [...project.tasks, payload.data]},
                    };
                } else {
                    return project;
                }
            });

        case RETRIEVE_PROJECTS:
            return projects;

        case UPDATE_TASK_STATUS:
            return projects.map((project) => {
                if (project.id === payload.id) {
                    const newTask = project.tasks.map(t => (t.id === payload.tid) ? {...t, ...{completed: !t.completed}} : t)
                    return {
                        ...project,
                        ...{tasks: newTask},
                    };
                } else {
                    return project;
                }
            });

        case DELETE_PROJECT:
            return projects.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_PROJECTS:
            return [];

        default:
            return projects;
    }
}

export default projectReducer;
