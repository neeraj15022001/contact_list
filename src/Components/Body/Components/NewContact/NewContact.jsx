import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Box from "@mui/material/Box";

function NewContact() {
    const [inputs, setInputs] = useState({name: "", email: "", mobile: ""})
    const createContact = (e) => {
        e.preventDefault();
        fetch("https://contacts-list-api-v1.herokuapp.com/api/v1/contacts/create", {
            method: "post", body: JSON.stringify(inputs),mode: "no-cors", headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                window.location.assign("/")
            })
            .catch(err => console.log(err))
    }
    const handleChange = (e) => {
        setInputs(() => {
            const key = e.target.name;
            const value = e.target.value;
            let newDetails = {
                ...inputs
            }
            newDetails[key] = value;
            return newDetails;
        })
    }
    return (
        <Box>
            <Box sx={{mb: 2}}>
                <h1>New Contact</h1>
            </Box>
            <Box sx={{width: "50vw"}}>
                <form onSubmit={createContact}
                      style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "stretch"}}>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 1}}>
                        <PersonOutlineOutlinedIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="name" type={"text"} label="Name" name={"name"} variant="standard"
                                   fullWidth={true} required={true} value={inputs.name} onChange={handleChange}/>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 1}}>
                        <CallOutlinedIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="mobile" label="Mobile" name={"mobile"} variant="standard" fullWidth={true}
                                   required={true} value={inputs.mobile} onChange={handleChange}/>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', mb: 3}}>
                        <EmailOutlinedIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                        <TextField id="email" type={"email"} label="Email" name={"email"} variant="standard"
                                   fullWidth={true} required={true} value={inputs.email} onChange={handleChange}/>
                    </Box>
                    <Box>
                        <Button type={"submit"} variant={"contained"} color={"primary"} sx={{ml: 3}}>Create</Button>
                    </Box>
                </form>
            </Box>

        </Box>
    );
}

export default NewContact;