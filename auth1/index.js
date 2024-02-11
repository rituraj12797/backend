const express = require("express");
const app = express();
const dbConnect = require("./config/database");
const router = require("./routes/user");

require('dotenv').config();

const PORT = process.env.PORT || 4000

const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello dush")
})

dbConnect();
app.use("/api/v1",router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

// {
    // "name":"rituraj",
    // "email":"alchemyrecloak@gmail.com",
    // "password":"alchemy365",
    // "role":"student"
// }