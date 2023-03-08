import React, { useContext, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import toast, { Toaster } from 'react-hot-toast';
import { adminLoading } from '../../../pages/Admin/Home/Home';
import { useNavigate } from 'react-router-dom';


function Departments() {
    const[departments,setDepartments] = useState([])
    const { changeLoading } = useContext(adminLoading)
    const [reload,setReload] = useState(false)
    const Navigate = useNavigate()
    let token = localStorage.getItem('adminToken')
    useEffect(()=>{
        changeLoading(true)
        token = localStorage.getItem('adminToken')
        const headers = {Authorization:token}
        axios.get(`${adminUrl}departments`,{headers}).then((response)=>{
            response.status === 200 ? setDepartments(response.data) : toast.error('some unexpected errors')
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        }).finally(()=>changeLoading(false))
    },[reload])

    const unListDepartment = (id)=>{
        const headers = {Authorization:token}
        axios.get(`${adminUrl}unListDepartment/${id}`,{headers}).then((response)=>{
            response.status === 200 ? (reload ? setReload(false):setReload(true)) : toast.error('some unexpected errors')
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }
    const listDepartment = (id)=>{
        const headers = {Authorization:token}
        axios.get(`${adminUrl}listDepartment/${id}`,{headers}).then((response)=>{
            response.status === 200 ? (reload ? setReload(false):setReload(true)) : toast.error('some unexpected errors')
        }).catch((err)=>{
            err?.response?.status === 401 ? Navigate('/admin') : toast.error('something went wrong')
        })
    }


    const columns = [
        {
            field: 'index',
            headerName: '#',
            width: 100,
            renderCell: (params) => {
                const rowId = params.row._id;
                const rowIndex = departments.findIndex((row) => row._id === rowId);
                return (
                    <div>{rowIndex + 1}</div>
                );
            },
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'commonDiseases', headerName: 'common diseases', width: 300 ,
            renderCell:(params)=>{
                return(
                    <ul>
                        {params.value.map((disease,index)=>{
                            return <li key={index}>{disease}</li>
                        })}
                    </ul>
                )
            }
    
    
    },
       
        {
            field: 'imageUrl',
            headerName: 'image',
            sortable: false,
            width: 120,
            renderCell: (params) => {
                const [selectedRow, setSelectedRow] = useState(null);

                const handleOpen = () => {
                    setSelectedRow(params._id);
                };

                const handleClose = () => {
                    setSelectedRow(null);
                };

                return (
                    <Box>
                        <Button variant="contained" onClick={handleOpen} style={{ textTransform: 'none' }}>
                            View
                        </Button>
                        <Modal open={selectedRow === params._id}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 800 }}>
                                    <Card sx={{ width: "100%" }}>
                                        <CardMedia component="img" src={params.value} alt="Certificate" />
                                    </Card>
                                </Box>
                                <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Modal>
                    </Box>
                );
            }

        },
        {
            field: 'list',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    params.value ? <div className='tableAction'>
                        <button onClick={()=>{unListDepartment(params.row._id)}} className='btn-danger btn'>unList</button>
                    </div> : <div className='tableAction'>
                        <button className='btn-success btn' onClick={()=>{listDepartment(params.row._id)}}>List</button>
                    </div>
                )
            }
    
    
        }
    ]



  return (
        <div className='dataTable w-100'>
            <Toaster/>
            <DataGrid
                getRowId={(row) => row._id}
                rows={departments}
                rowHeight={70}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
            />
        </div>
  )
}

export default Departments
