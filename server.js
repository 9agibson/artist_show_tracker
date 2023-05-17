const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require("cors")

app.use(cors())
dotenv.config()
app.use(express.json())

app.listen(process.env.PORT || 5000,() => {
    console.log("server is running on port 5000")
})