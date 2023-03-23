import { createContext, useMemo, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
    darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

    const contextProvider = useMemo(
        () => ({ darkMode: state.darkMode, dispatch }),
        [state]
    );
    return (
        <DarkModeContext.Provider value={contextProvider}>
            {children}
        </DarkModeContext.Provider>
    );
};
