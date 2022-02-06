import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from "@mui/material/IconButton";
import {CircularProgress, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import {ContactsContext} from "../../../../context/ContactsContext";


function ContactsTable() {
    const [rows, setRows] = React.useContext(ContactsContext);
    const [loading, setLoading] = React.useState(true)
    const [disabled, setDisabled] = React.useState(false)
    const handleClick = (e) => {
        // console.log(e.currentTarget.dataset.id, e.currentTarget)
        const action = e.currentTarget.dataset.action;
        const contactID = e.currentTarget.dataset.id;
        setDisabled(() => !disabled)
        if (action === "delete") {
            fetch(`/contacts/delete?id=${contactID}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(res => {
                    // console.log(res);
                    setDisabled(false)
                    const filteredArr = rows.filter(row => {
                        return row._id !== contactID
                    })
                    setRows(filteredArr)
                })
                .catch(err => {
                    console.log(err)
                    setDisabled(false)
                })
        }
    }
    useEffect(() => {
        let mounted = true
        fetch("/contacts/read")
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (mounted) {
                    setRows(res.data)
                    setLoading(false)
                }
            })
            .catch(err => console.log(err))
        return () => mounted = false;
    }, [])
    return (
        <TableContainer component={Box}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight: "bold"}}>Name</TableCell>
                        <TableCell sx={{fontWeight: "bold"}} align="right">Phone&nbsp;Number</TableCell>
                        <TableCell sx={{fontWeight: "bold"}} align="right">Email</TableCell>
                        <TableCell sx={{fontWeight: "bold"}} align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading && (
                        <TableRow>
                            <TableCell sx={{border: "0"}}>
                                <CircularProgress sx={{mt: 2}}/>
                            </TableCell>
                        </TableRow>
                    )}
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{border: 0}}
                            hover={true}
                            id={row._id}
                        >
                            <TableCell component="th" scope="row" sx={{border: 0}}>
                                {row.name}
                            </TableCell>
                            <TableCell align="right" sx={{border: 0}}>{row.mobile}</TableCell>
                            <TableCell align="right" sx={{border: 0}}>{row.email}</TableCell>
                            <TableCell align="right" sx={{border: 0}}>
                                <Tooltip title={"View"}>
                                    <Link to={`/contacts/${row._id}`}>
                                        <IconButton aria-label={"view"} data-action={"view"}
                                                    data-id={row._id} disabled={disabled}>
                                            <RemoveRedEyeOutlinedIcon color={disabled ? "disabled" : "warning"}
                                                                      data-action={"view"}
                                                                      data-id={row._id}/>
                                        </IconButton>
                                    </Link>
                                </Tooltip>
                                <Tooltip title={"Edit"}>
                                    <IconButton aria-label={"edit"} disabled={disabled}>
                                        <EditOutlinedIcon color={disabled ? "disabled" : "primary"}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={"Delete"}>
                                    <IconButton aria-label={"delete"} onClick={handleClick} data-action={"delete"}
                                                data-id={row._id} disabled={disabled}>
                                        <DeleteIcon color={disabled ? "disabled" : "error"} data-action={"delete"}
                                                    data-id={row._id}/>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ContactsTable;