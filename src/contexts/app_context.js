import {useState, createContext} from 'react';

export const AppContext = createContext();

// we take in props because we want access to the children
const AppContextProvider = (props) => {
    // put our state

    const [user, setUser] = useState(true);
    const [items, setItems] = useState([]);
    const [activeCat, setActiveCat] = useState('Sandwiches');
 
    return (
        <AppContext.Provider value={{
            user, setUser,

            items, setItems,

            activeCat, setActiveCat
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;