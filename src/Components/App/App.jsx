import React from 'react';
import "./App.css";
import Body from "../Body/Body"
import {DrawerProvider} from "../../context/DrawerContext";

const App = () => {
    return (
        <DrawerProvider>
            <div>
                <Body/>
            </div>
        </DrawerProvider>
    );
};

export default App;