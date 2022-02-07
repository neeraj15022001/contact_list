import React, {useContext, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {alpha, styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import {DrawerContext} from "../../../../context/DrawerContext";
import {Link} from "react-router-dom";
import {ContactsContext} from "../../../../context/ContactsContext";

function ContactsAppBar() {
    const [open, setOpen] = useContext(DrawerContext);
    const [contacts, setContacts] = useContext(ContactsContext);
    const [search, setSearch] = useState("");
    const drawerWidth = 240;
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({theme, open}) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '20ch',
            },
        },
    }));
    const searchResult = (query) => {
        fetch(`/api/v1/contacts/search?search=${query}`)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                setContacts(() => res.data)
            })
            .catch(err => console.log(err))
    }
    const handleChange = (e) => {
        // console.log(e.target.value)
        setSearch(() => e.target.value)
        searchResult(e.target.value)
    }
    return (
        <AppBar position="fixed" open={open} color={"transparent"} elevation={0}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setOpen(() => !open)}
                    edge="start"
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                >
                    <MenuIcon/>
                </IconButton>

                <Box sx={{display: "flex", flexGrow: 1, alignItems: "center"}}>
                    <AccountCircle color={"primary"} sx={{fontSize: "2rem", marginRight: "8px"}}/>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        <Link to={"/"} style={{textDecoration: "none", color: "black"}}>Contacts</Link>
                    </Typography>
                </Box>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search"
                        inputProps={{'aria-label': 'search'}}
                        value={search}
                        onChange={handleChange}
                        autoFocus={true}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    );
}

export default ContactsAppBar;