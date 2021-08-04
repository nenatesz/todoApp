import React, {createContext, useReducer} from 'react';
import usersActionTypes from './users.types';

const initialState = {
    currentUser: null,
    error: [],
    loading: false
}

export const userContext = createContext(initialState);
const {Provider} = userContext;


const reducer = (state, action) => {
    switch(action.type){
        case usersActionTypes.LOGIN_USER:
            return {
                ...state,
                currentUser: action.currentUser,
                error: [],
                loading: false
            }
            default:
                return state
    }

}

const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <Provider value ={{state, dispatch}}>
            {children}
        </Provider>
    )
};

export default UserProvider;
