const express = require('express');
const app = express()
const db=require('./db')
const cors = require('cors');


const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.use(cors());
const dotenv = require('dotenv')
dotenv.config()

const userRoutes=require('./Routes/UserRoutes')
const CandidateRoutes=require('./Routes/CandidateRoutes')

app.use('/User',userRoutes)
app.use('/Candidate',CandidateRoutes)
const Port=process.env.PORT || 3000
app.listen(Port, () => {
  console.log(`Server running on port `,{Port});
});