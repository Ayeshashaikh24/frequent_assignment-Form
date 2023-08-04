const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const mongodb= require("./db")
const PORT =  5000;
app.use(express.json());
app.use('/api', require("./routes"))

mongodb()
  app.listen(PORT,()=>{
    console.log(`running on ${PORT}` )
})