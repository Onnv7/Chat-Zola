
import { createContext } from 'react';
import { useReducer } from 'react';

const INITIAL_STATE = {
    id: null,
    friend: null,
    message: null,
}
export const SelectedConversationContext = createContext(INITIAL_STATE);

const SelectedConversationReducer = (state, action) => {
    switch (action.type) {
        case "SET_CONVERSATION":
            return action.payload;
        case "CLEAR_CONVERSATION":
            return INITIAL_STATE;
        default:
            return state;
    }
}

export const SelectedConversationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SelectedConversationReducer, INITIAL_STATE);

    return (
        <SelectedConversationContext.Provider
            value={{
                conversation: {
                    id: state.id,
                    friend: state.friend,
                    message: state.message
                },
                dispatch
            }}>
            {children}
        </SelectedConversationContext.Provider>
    )
}