import React, {useState, createContext} from "react";

export const DrawerContext = createContext();
export const DrawerProvider = (props) => {
    const [toggle, setToggle] = useState(false);
    return (
        <DrawerContext.Provider value={[toggle, setToggle]}>
            {props.children}
        </DrawerContext.Provider>
    )
}