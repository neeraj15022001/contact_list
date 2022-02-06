import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";


function ContactsTable() {
    const [rows, setRows] = React.useState([]);
    useEffect(() => {
        let mounted = true
        fetch("/contacts/read")
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (mounted) {
                    setRows(res.data)
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
                    </TableRow>
                </TableHead>
                <TableBody>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ContactsTable;