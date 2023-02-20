import express, { application } from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import connection from './config/dbConnection.js'
import userRouter from './routes/user.js'
import adminRouter from './routes/admin.js'
import doctorRouter from './routes/doctor.js'
import cors from 'cors'

const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true,parameterLimit:50000}))
app.use(logger('dev'))
app.use(cookieParser())
connection()
app.use(cors({
    origin:['http://localhost:4000'],
    methods:['GET','POST','PUT','DELETE','PATCH'],
    credentials:true,
    allowedHeaders:[
        'Content-type',
        'Access'
    ]
})) 

app.use('/admin',adminRouter)
app.use('/',userRouter)
app.use('/doctor',doctorRouter)

app.listen(2000,()=>{
    console.log('server connected to port 2000');
})

