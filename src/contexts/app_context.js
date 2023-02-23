import {useState, createContext} from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    // put our state

    const [user, setUser] = useState(true);
    const [stuff, setStuff] = useState("This is some stuff")
    const [activeCat, setActiveCat] = useState('Sandwiches')
 
    return (
        <AppContext.Provider value={{
            user, setUser,

            stuff, setStuff,

            activeCat, setActiveCat
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;