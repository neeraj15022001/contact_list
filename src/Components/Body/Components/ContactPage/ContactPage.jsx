import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import TextField from "@mui/material/TextField";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Button from "@mui/material/Button";

function ContactPage() {
    const [loading, setLoading] = useState(true)
    const [contact, setContact] = useState({})
    const {id} = useParams();
    const editMode = new URLSearchParams(useLocation().search).get("edit");

    useEffect(() => {
        let mounted = true
        fetch(`/contacts?id=${id}`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                console.log(res)
                if (mounted) {
                    setLoading(false)
                    setContact(res.data)
                }
            })
            .catch(err => console.log(err))
        return () => mounted = false;
    }, [id])
    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        let updatedContact = {...contact};
        updatedContact[key] = value
        setContact(() => updatedContact)

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`/contacts/update?id=${contact._id}&name=${contact.name}&email=${contact.email}&mobile=${contact.mobile}`, {
            method: "PUT",
            redirect: "follow"
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setContact(() => res.data)
                window.location.assign("/")
            })
            .catch(err => console.log(err))
    }
    return (<div>
        {loading && <CircularProgress/>}
        {!editMode && contact && (<>
            <h1 style={{marginBottom: "16px"}}>Contact Details</h1>
            <p>Name : {contact.name}</p>
            <p>Mobile : {contact.mobile}</p>
            <p>Email: {contact.email}</p>
        </>)}
        {editMode && contact && (<>
            <h1 style={{marginBottom: "16px"}}>Edit Contact</h1>
            <form style={{width: "50%"}} onSubmit={handleSubmit}>
                <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 1}}>
                    <PersonOutlineOutlinedIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="name" type={"text"} label="Name" name={"name"} variant="standard"
                               fullWidth={true} required={true} value={contact.name || ""}
                               onChange={handleChange}/>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 1}}>
                    <CallOutlinedIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="mobile" label="Mobile" name={"mobile"} variant="standard" fullWidth={true}
                               required={true} value={contact.mobile || ""} onChange={handleChange}/>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 3}}>
                    <EmailOutlinedIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                    <TextField id="email" type={"email"} label="Email" name={"email"} variant="standard"
                               fullWidth={true} required={true} value={contact.email || ""}
                               onChange={handleChange}/>
                </Box>
                <Box>
                    <Button type={"submit"} variant={"contained"} color={"primary"} sx={{ml: 3}}>Update</Button>
                </Box>
            </form>
        </>)}
    </div>);
}

export default ContactPage;