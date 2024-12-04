import { createContext, useReducer } from "react";

let initialState = {
    token: '',
    authenticated: false
}

function reductor(state, action) {
    switch(action.type) {
        case 'place': {
            const newState = {
                token: action.token,
                authenticated: true
            }
            return newState;
        }
        default: {
            throw new Error();
        }
    }
}

export let AuthContext = createContext(null);

function AuthMemory({ children }) {
    const value = useReducer(reductor, initialState);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )    
}

export default AuthMemory;