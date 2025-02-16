const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const morgan = require('morgan')
const userRouter = require('./routes/userRouter')
const employeeRouter = require('./routes/employeeRouter')
const cors = require('cors')



const mongoUrl = process.env.MONGOURL
mongoose.connect(mongoUrl).then(()=>{
    console.log('Database Successfully Connected')
})



const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/auth", userRouter)
app.use("/auth", employeeRouter)

app.use(morgan('dev'))
app.use(cors());

const port = process.env.PORT || 4500

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})