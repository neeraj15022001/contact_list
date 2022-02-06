import React, {useContext} from 'react';
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import {styled, useTheme} from "@mui/material/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {DrawerContext} from "../../../../context/DrawerContext";

const drawerWidth = 240;
const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

function ContactsDrawer() {
    const [open, setOpen] = useContext(DrawerContext);
    const theme = useTheme();
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={() => setOpen(() => !open)}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>
                <ListItem>
                    <Button variant="outlined" startIcon={<AddIcon/>} sx={{width: "100%", borderRadius: "20px"}}>
                        Create Icon
                    </Button>
                </ListItem>
                {['Contacts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default ContactsDrawer;