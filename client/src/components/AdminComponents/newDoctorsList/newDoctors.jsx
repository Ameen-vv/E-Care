import React, { useEffect, useState,useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import './newDoctors.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { adminLoading } from '../../../pages/Admin/Home/Home';


function NewDoctors() {
    const [doctorData, setDoctorData] = useState([])
    const [reload, setReload] = useState(false)
    const [open, setOpen] = React.useState(false)
    const [reject,setReject] = useState('')
    const {adminLoad,changeLoading} = useContext(adminLoading)
    let pageNumber = Math.ceil(doctorData.length/10)
    useEffect(() => {
        changeLoading(true)
        axios.get(`${adminUrl}getNewDoctors`).then((response) => {
            setDoctorData(response.data)
        }).finally(()=>changeLoading(false))
    }, [reload])
    const approveDoctor = (doctorId) => {
        changeLoading(true)
        axios.get(`${adminUrl}approve/${doctorId}`).then((response) => {
            response.data && reload ? setReload(false) : setReload(true)
        }).finally(()=>changeLoading(false))
    }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const rejectDoctor = (doctorId) => {
        setOpen(false)
        changeLoading(true)
        axios.post(`${adminUrl}reject`,{doctorId,reject}).then((response) => {
            response.data && reload ? setReload(false) : setReload(true)
        }).finally(()=>changeLoading(false))
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 200 },
        { field: 'fullName', headerName: 'Full name', width: 200 },
        { field: 'email', headerName: 'email', width: 200 },
        ,
        {
            field: 'phone',
            headerName: 'Phone',
            sortable: false,
            width: 150,
        },
        {
            field: 'qualification',
            headerName: 'qualification',
            sortable: false,
            width: 150,
        },
        {
            field: 'department',
            headerName: 'Department',
            sortable: false,
            width: 150,
        },
        {
            field: 'block',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                console.log(params.row.block);
                console.log(reject);
                return (
                    
                    <div className='tableAction'>
                        <button onClick={() => { approveDoctor(params.row._id) }} className='btn-success btn me-2'>Approve</button>

                        <Button variant="contained" color='error' onClick={handleClickOpen} style={{ textTransform: 'none' }}>
                            Reject
                        </Button>
                        <Dialog open={open} onClose={handleClose} 
                            BackdropProps={{
                                style: {
                                    backgroundColor: 'black',
                                    opacity:0.2
                                },
                            }}>
                            <DialogTitle>Subscribe</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To subscribe to this website, please enter your email address here. We
                                    will send updates occasionally.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="none"
                                    id="name"
                                    label="Reason"
                                    type="Text"
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        style: {
                                          outline: "none"
                                        }
                                      }}
                                    onChange={(e)=>setReject(e.target.value)}  
                                  
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={() => { rejectDoctor(params.row._id) }}>Submit</Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                    
                )
            }


        }
    ];
    return (
        <div className='dataTable'>
            <DataGrid
                getRowId={(row) => row._id}
                rows={doctorData}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
        </div>
    )
}

export default NewDoctors
