import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userUrl } from "../../../apiLinks/apiLinks";

export const fetchDepartments = createAsyncThunk('department/fetchDepartments',()=>{
    return (
        axios.get(`${userUrl}getDepartments`).then((response)=>{
            let result={
                data:response.data,
                status:response.status
            }
            return result
        })
    )
})
const departmentSlice = createSlice({
    name:'department',
    initialState:{
        loading:false,
        departments:[],
        error:false
    },
    extraReducers:builder =>{
        builder.addCase(fetchDepartments.pending,state=>{
            state.loading = true
        })
        builder.addCase(fetchDepartments.fulfilled,(state,action)=>{
            state.loading = false
            state.departments = action.payload.data
            state.error = false
        })
        builder.addCase(fetchDepartments.rejected,(state,action)=>{
            state.loading = false
            state.departments = []
            state.error = true
        })
    }
})

export default departmentSlice.reducer