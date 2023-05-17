// const express = require('express')
// const app = express()
// const dotenv = require('dotenv')
// const cors = require("cors")

import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

app.use(cors())
dotenv.config()
app.use(express.json())

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './music-map/build')));

app.listen(process.env.PORT || 5000,() => {
    console.log("server is running on port 5000")
})