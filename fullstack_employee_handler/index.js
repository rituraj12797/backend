const express = require('express');
const app = express();
const dbconnect = require('./config/database');
const userRouter = require('./routes/userRouter');
const cors = require('cors')

//import the dot env
require('dotenv').config();
const port = process.env.PORT || 4531;
// mount middleware and routers

app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json());
app.use('/api/v1',userRouter);

//adding cross origin 



// app starts to listen 
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

dbconnect();

// default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
