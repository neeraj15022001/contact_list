import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ContactsTable from "./Components/ContactsTable/ContactsTable"
import ContactsDrawer from "./Components/ContactsDrawer/ContactsDrawer";
import {useContext} from "react";
import {DrawerContext} from "../../context/DrawerContext";
import {styled} from "@mui/material/styles";
import ContactsAppBar from "./Components/ContactsAppBar/ContactsAppBar";

const drawerWidth = 240;
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function Body() {

    const [open, setOpen] = useContext(DrawerContext);
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <ContactsAppBar/>
            <ContactsDrawer/>
            <Main open={open}>
                <DrawerHeader/>
                <ContactsTable/>
            </Main>
        </Box>
    );
}

export default Body;
