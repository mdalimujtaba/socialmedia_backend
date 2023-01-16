const express=require("express")
const postRoute=express.Router()
const {PostModel}=require("../model/post.model")

postRoute.get("/",async(req,res)=>{
    let query=req.query
    console.log(query)
    try {
        let total_post=await PostModel.find(query)
        console.log(total_post)
        res.send(total_post)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong while getting data")
    }
})
postRoute.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        let post=new PostModel(payload)
        await post.save()
        res.send(post)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})
postRoute.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const findpost=await PostModel.findOne({_id:id})
    // console.log(findpost)
    const userid_from_req=req.body.userID 
    const userid_in_findpost=findpost.userID
    // console.log(userid_from_req)

    // console.log(userid_in_findpost)
    try {
        if(userid_from_req!==userid_in_findpost){
            res.send("You are not authorized")
        }else{
            const update_item=await PostModel.findByIdAndUpdate({_id:id},payload)
            console.log(update_item)
            res.send(`id number ${id} is updated`)
        }
    } catch (error) {
        console.log(error)
        res.send('someting went wrong')
    }

})
postRoute.delete("/delete/:id",async(req,res)=>{
    
    const id=req.params.id
    const findpost=await PostModel.findOne({_id:id})
    console.log(findpost)

    const userid_from_req=req.body.userID 
    const userid_in_findpost=findpost.userID
    // console.log(userid_from_req)

    // console.log(userid_in_findpost)
    try {
        if(userid_from_req!==userid_in_findpost){
            res.send("You are not authorized")
        }else{
            const deleted_item=await PostModel.findByIdAndDelete({_id:id})
            console.log(deleted_item)
            res.send(`id number ${id} is deleted`)
        }
    } catch (error) {
        console.log(error)
        res.send('someting went wrong')
    }

})

module.exports={
    postRoute
}