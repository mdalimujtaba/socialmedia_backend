const express=require("express")
const { connection } = require("./configs/db")
const cors=require('cors')
const { authenticate } = require("./middleware/authentication.middlware")
const { postRoute } = require("./route/post.route")
const { userRoute } = require("./route/user.route")
require("dotenv").config()
const app=express()
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRoute)
app.use(authenticate)
app.use("/posts",postRoute)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (err) {
        console.log(err)
        console.log("Something went wrong while connection database")
    }
    console.log(`server is running at http://localhost:${process.env.port}`)
})