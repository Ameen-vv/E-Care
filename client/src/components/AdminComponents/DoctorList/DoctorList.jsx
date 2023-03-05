import React, { useEffect, useState } from 'react'
import './DoctorList.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { adminUrl } from '../../../../apiLinks/apiLinks';

function DoctorList() {
    const[doctorData,setDoctorData] = useState([])
    const [reload,setReload] = useState(false)

    useEffect(()=>{
        axios.get(`${adminUrl}getDoctorList`).then((response)=>{
            setDoctorData(response.data)
        })
    },[reload])
    const blockDoctor = (doctorId)=>{
        axios.get(`${adminUrl}blockDoctor/${doctorId}`).then((response)=>{
            reload ? setReload(false) : setReload(true)
        })
    }
    const unBlockDoctor = (doctorId)=>{
        axios.get(`${adminUrl}unBlockDoctor/${doctorId}`).then((response)=>{
            reload ? setReload(false) : setReload(true)
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
            width: 200,
        },
        {
            field: 'qualification',
            headerName: 'qualification',
            sortable: false,
            width: 200,
        },
        {
            field: 'department',
            headerName: 'Department',
            sortable: false,
            width: 200,
        },
        {
            field: 'block',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                    return (
                    params.row.block ? <div className='tableAction'>
                        <button onClick={() => { unBlockDoctor(params.row._id) }} className='btn-success btn'>unBlock</button>
                    </div> : <div className='tableAction'>
                        <button className='btn-danger btn' onClick={() => { blockDoctor(params.row._id) }}>Block</button>
                    </div>
                )
            }


        }
    ];

    return (
        <div className='dataTable w-100 '>
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

export default DoctorList
