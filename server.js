const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const notesRoutes = require("./routes/notes");
const userRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5001
const {MONGO_URL} = process.env

const MONGODB_URL = MONGO_URL


app.use(express());
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", userRoutes);
app.use("/notes", notesRoutes);

mongoose.connect(MONGODB_URL)
.then(() =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.log(err))