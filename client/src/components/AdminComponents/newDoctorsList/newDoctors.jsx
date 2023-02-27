import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';
import './newDoctors.css'


function NewDoctors() {
    const [doctorData,setDoctorData] = useState([])
    const [reload,setReload] = useState(false)
    useEffect(()=>{
        axios.get(`${adminUrl}getNewDoctors`).then((response)=>{
            setDoctorData(response.data)
        })
    },[reload])
    const approveDoctor = (doctorId)=>{
        axios.get(`${adminUrl}approve/${doctorId}`).then((response)=>{
          response.data &&  reload ? setReload(false) : setReload(true)
        })
    }
    const rejectDoctor = (doctorId)=>{
        axios.get(`${adminUrl}reject/${doctorId}`).then((response)=>{
            response.data &&  reload ? setReload(false) : setReload(true)
        })
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
                return (
                     <div className='tableAction'>
                        <button onClick={() => { approveDoctor(params.row._id) }} className='btn-success btn me-2'>Approve</button>
                        <button className='btn-danger btn' onClick={() => { rejectDoctor(params.row._id) }}>Reject</button>
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
                pageSize={5}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}

export default NewDoctors
