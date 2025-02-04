const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const morgan = require('morgan')
const userRouter = require('./routes/userRouter')
const employeeRouter = require('./routes/employeeRouter')



const mongoUrl = process.env.MONGOURL
mongoose.connect(mongoUrl).then(()=>{
    console.log('Database Successfully Connected')
})



const app = express()
app.use(express.json())

app.use("/auth", userRouter)
app.use("/auth", employeeRouter)

app.use(morgan('dev'))

const port = process.env.PORT || 4500

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})