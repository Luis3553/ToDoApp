import { createContext, useReducer } from "react";

const initialState = {
    username: '',
    profilePhoto: '',
    tasks: {
        order: [],
        objects: {}
    }
};

function reducer(state, action) {
    switch (action.type) {
        case 'place': {
            const { tasks, username, image } = action.user;
            const newState = {
                username,
                profilePhoto: image,
                tasks: {
                    order: tasks.map(task => task.id),
                    objects: tasks.reduce((obj, task) => ({ ...obj, [task.id]: task }), {})
                }
            };
            return newState;
        }
        case 'check': {
            const taskId = action.id;
            const newObjects = {
                ...state.tasks.objects,
                [taskId]: { 
                    ...state.tasks.objects[taskId], 
                    completed: !state.tasks.objects[taskId].completed 
                }
            };
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    objects: newObjects
                }
            };
        }
        case 'create': {
            const { id, name, completed } = action.task;
            return {
                ...state,
                tasks: {
                    order: [...state.tasks.order, id],
                    objects: {
                        ...state.tasks.objects,
                        [id]: { id, name, completed }
                    }
                }
            };
        }
        case 'delete': {
            const taskId = action.id;
            const newOrder = state.tasks.order.filter(id => id !== taskId);
            const { [taskId]: _, ...newObjects } = state.tasks.objects;
            return {
                ...state,
                tasks: {
                    order: newOrder,
                    objects: newObjects
                }
            };
        }
        case 'update': {
            const { id, name, completed } = action.task;
            const newObjects = {
                ...state.tasks.objects,
                [id]: { id, name, completed }
            };
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    objects: newObjects
                }
            };
        }
        case 'setPhoto': {
            const { photo } = action;
            return {
                ...state,
                profilePhoto: photo
            };
        }
        default: {
            throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}

export const ContextTasks = createContext(null);

function TasksMemory({ children }) {
    const value = useReducer(reducer, initialState);

    return (
        <ContextTasks.Provider value={value}>
            {children}
        </ContextTasks.Provider>
    );
}

export default TasksMemory;