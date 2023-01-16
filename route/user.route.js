const express=require("express")
const userRoute=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/user.model")

userRoute.post("/register",(req,res)=>{
    let {name,email,gender,password}=req.body

    try {
        bcrypt.hash(password, 5, async(err, secure_password)=> {
           if(err){
            console.log(err)
           }
           else{
            let post=new UserModel({name,email,gender,password:secure_password})
            await post.save()
            res.send("Registration Successfull")
            console.log(post)
           }
        });
    } catch (error) {
        res.send(error)
        console.log("Something went wrong")
    }

})

userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body
    let userlogin=await UserModel.find({email})
    try {
        bcrypt.compare(password, userlogin[0].password, (err, result)=> {
            if(result){
                var token = jwt.sign({ userID:userlogin[0]._id }, 'masai');
                res.send({"msg":"Login Successful","token":token})
                console.log("login sucessful")
            }
            else{
                res.send("wrong credential")
            }
        });
    } catch (error) {
        res.send("Something went wrong")
        console.log(error)
    }
})

module.exports={
    userRoute
}