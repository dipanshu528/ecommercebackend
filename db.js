const mongoose = require('mongoose');

// Load environment variables from .env
require('dotenv').config();

const DB = process.env.DB_URI; // Use DB_URI as the variable name

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connection successfully established');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});



// const mongoose = require('mongoose');
// const mongoURI = 'process.env.DATABASE'

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Coonected to mongo succesfully")
//     })
// }

// module.exports = connectToMongo;