import { Children, createContext } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({children})=>{
    return(
        <AppContext.Provider value={{}}>
            {Children.only(children)}
        </AppContext.Provider>
    )
}