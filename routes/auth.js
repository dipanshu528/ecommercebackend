const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "shhhhh$hh";


// ROUTE:1 Create a user using: POST "/api/auth/"  Dosen't require auth
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min:3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atlest 5 character').isLength({ min:5})
],
 async (req, res)=>{
    // if tere are error return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({success, errors: errors.array() });
    }

    try{
let user = await User.findOne({email: req.body.email})
if(user){
  success = false;
  return res.status(400).json({success, error: "user with this email is already exist"})
}

const salt = await bcrypt.genSalt(10);
const secPass = await bcrypt.hash(req.body.password, salt);

  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
  })

  const data = {
    user:{
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.json({success, authtoken});

    } catch(error){
      console.log(error.message)
      res.status(500).send("some error occured")
    }

})



// Authenticate a user using: POST "/api/auth/"  Dosen't require login
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atlest 5 character').isLength({ min:5})
],
async (req, res)=>{
  let success = false;
// if tere are error return bad request and errors
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
}

const {email, password} = req.body;

try {
  const user = await User.findOne({email});
  if(!user){
    success = false;
    return res.status(400).json({success, errors: "login with correct data" });
  }

const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
  success = false;
  return res.status(400).json({success, errors: "login with correct data" });
}

const data = {
  user:{
    id: user.id
  }
}
const authtoken = jwt.sign(data, JWT_SECRET);

  success = true;
res.json({success, authtoken});


} catch (error) {
  console.log(error.message)
  res.status(500).send("some error occured")
}

})




// Route:3  Get user datails  using: POST "/api/auth/"   require login
router.get('/getuser', fetchuser, async (req, res)=>{

  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error occured")
  }

})



module.exports = router;