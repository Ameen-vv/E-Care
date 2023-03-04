import React,{useEffect,useState} from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import { adminUrl } from '../../../../apiLinks/apiLinks';


 


function Table() {
    const [userData,setUserData] = useState([])
    const [reload,setReload] = useState(false)

    useEffect(()=>{
        axios.get(`${adminUrl}getUsers`).then((response)=>{
            console.log(response.data)
            setUserData(response.data)
        })    
    },[reload])
    
    const blockUser = (userId)=>{
        axios.get(`${adminUrl}blockUser/${userId}`).then((response)=>{
           reload ? setReload(false) : setReload(true)
        })
    }
    const unBlockUser = (userId)=>{
        axios.get(`${adminUrl}unBlockUser/${userId}`).then((response)=>{
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
            field: 'block',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    params.row.block ? <div className='tableAction'>
                        <button onClick={()=>{unBlockUser(params.row._id)}} className='btn-success btn'>unBlock</button>
                    </div> : <div className='tableAction'>
                        <button className='btn-danger btn' onClick={()=>{blockUser(params.row._id)}}>Block</button>
                    </div>
                )
            }
    
    
        }
    ];

    return (
        <div className='dataTable w-100'>
            <DataGrid
                getRowId={(row) => row._id}
                rows={userData}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
            />
        </div>
    )
}

export default Table
