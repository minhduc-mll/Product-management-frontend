import { createContext, useContext, useReducer } from "react";

const DarkModeContext = createContext(null);

const DarkModeDispatchContext = createContext(null);

export const DarkModeContextProvider = ({ children }) => {
    const [mode, dispatch] = useReducer(DarkModeReducer, initialMode);

    return (
        <DarkModeContext.Provider value={mode.darkMode}>
            <DarkModeDispatchContext.Provider value={dispatch}>
                {children}
            </DarkModeDispatchContext.Provider>
        </DarkModeContext.Provider>
    );
};

export const useMode = () => {
    return useContext(DarkModeContext);
};

export const useModeDispatch = () => {
    return useContext(DarkModeDispatchContext);
};

const DarkModeReducer = (mode, action) => {
    switch (action.type) {
        case "LIGHT": {
            return {
                darkMode: false,
            };
        }
        case "DARK": {
            return {
                darkMode: true,
            };
        }
        case "TOGGLE": {
            return {
                darkMode: !mode.darkMode,
            };
        }
        default:
            return mode;
    }
};

const initialMode = {
    darkMode: false,
};
