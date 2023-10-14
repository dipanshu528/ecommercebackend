const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

require("dotenv").config();

const app = express();
const PORT =  process.env.PORT || 6010 ;

 app.use(cors({
    origin: "https://the-shoppinghub.netlify.app",
  methods: ["GET","POST", "DELETE"],  
  credentials: true
 }
 ));

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/detail', require('./routes/detail'));

app.listen(PORT, ()=>{
    console.log(`app listening at http://localhost:${PORT}`)
})