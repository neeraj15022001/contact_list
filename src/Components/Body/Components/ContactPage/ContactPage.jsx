import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";

function ContactPage() {
    const [loading, setLoading] = useState(true)
    const [contact, setContact] = useState({})
    const {id} = useParams()
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
    return (
        <div>
            {loading && <CircularProgress/>}
            {contact && (
                <>
                    <h1 style={{marginBottom: "16px"}}>Contact Details</h1>
                    <p>Name : {contact.name}</p>
                    <p>Mobile : {contact.mobile}</p>
                    <p>Email: {contact.email}</p>
                </>
            )}
        </div>
    );
}

export default ContactPage;