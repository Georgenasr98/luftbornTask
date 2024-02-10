import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { getproducts, deleteproducts, editprodcuts ,addroducts} from '../services/productsServices';

export default function BasicTable() {
    const [productTableData, setProductTableData] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState({ id: '', productName: '', productDescription: '', productPrice: '' });
    const [newData, setNewData] = useState({ productName: '', productDescription: '', productPrice: '' });

    const [openADD, setOpenADD] = useState(false);

    useEffect(() => {
        getproducts().then((data) => {
            setProductTableData(data);
        });
    }, []);

    const handleDelete = (id) => {
        deleteproducts(id).then(() => {
            setProductTableData(currentProductData => currentProductData.filter(data => data.id !== id));
        });
    };

    const handleClickOpenEdit = (product) => {
        setEditData(product);
        setOpen(true);
    };

    const handleCloseEdit = () => {
        setOpen(false);
    };

    const handleEdit = () => {
        editprodcuts(editData.id, editData).then(() => {
            setProductTableData(current => current.map(item => item.id === editData.id ? editData : item));
            setOpen(false);
        });
    };

    const handleAddOpen = () => {
        setOpenADD(true)
    }
    const handleAddClose = () => {
        setOpenADD(false)
    }
    const handlesubmit = () => {
        if (!newData.productName || !newData.productDescription || !newData.productPrice) {
            alert("All fields are required.");
            return;
        }
        addroducts(newData).then(()=>{
            setProductTableData(current=>[...current,newData])
            setOpenADD(false)

        })
    }
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <TableContainer component={Paper} sx={{ maxWidth: 800, mt: 4 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productTableData.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{row.productName}</TableCell>
                                    <TableCell align="center">{row.productDescription}</TableCell>
                                    <TableCell align="right">{row.productPrice}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="primary" onClick={() => handleClickOpenEdit(row)}>Edit</Button>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={open} onClose={handleCloseEdit}>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editData.productName}
                        onChange={(e) => setEditData({ ...editData, productName: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Product description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editData.productDescription}
                        onChange={(e) => setEditData({ ...editData, productDescription: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Product price"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={editData.productPrice}
                        onChange={(e) => setEditData({ ...editData, productPrice: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEdit}>Save</Button>
                </DialogActions>
            </Dialog>
            <Box display="flex" justifyContent="flex-end" sx={{ maxWidth: 800, mt: 2, mx: "auto" }}>
                <Button variant="contained" color="success" onClick={() => handleAddOpen()}>Add Product</Button>
            </Box>
            <Dialog open={openADD} onClose={handleAddClose}>
                <DialogTitle>Add Item</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) => setNewData({ ...newData, productName: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Product description"
                        type="text"
                        fullWidth
                        required
                        variant="standard"
                        onChange={(e) => setNewData({ ...newData, productDescription: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="price"
                        label="Product price"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) => setNewData({ ...newData, productPrice: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Cancel</Button>
                    <Button onClick={handlesubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
