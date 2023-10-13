const express = require('express');
const router = express.Router();
const Detail = require('../models/Detail');
var fetchuser = require('../middleware/fetchuser');


// ROUTE:1 
router.post('/userdetail', fetchuser,  async (req,res)=>{

try {
    const { phone, altphone, address , altaddress} = req.body;

    

     const userdetail = new Detail({
        phone, altphone, address , altaddress, user: req.user.id
     })
    const saveDetail = await userdetail.save();
    res.json(saveDetail);
} catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured")
}
})


// ROUTE:1 Get all the notes using GET "/ap/notes/fetchallnotes"  Login required
router.get('/fetchuserdetail', fetchuser,  async (req,res)=>{
    try {
        
        const detail = await Detail.find({user: req.user.id});
        res.json(detail);
    
    } catch (error) {
         console.log(error.message);
          res.status(500).send("some error occured")
    }
    })


module.exports = router;