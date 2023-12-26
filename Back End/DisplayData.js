const express = require('express')
const router = express.Router()



router.post('/fooddata', (req,res)=>{
    try{

        // console.log(global.food_catagory)
        // console.log(global.food_items)
        
        res.send([global.food_items, global.food_catagory])
        
        
    } catch (error){
        console.error(error.message)
        res.send("Server Error")
    }
    
})


module.exports = router;