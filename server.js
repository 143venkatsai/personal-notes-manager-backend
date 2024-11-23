const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const notesRoutes = require("./routes/notes");

const app = express();

const PORT = process.env.PORT || 5001
const MONGODB_URL = process.env.MONGO_URL

app.use(express());
app.use(bodyParser.json());
app.use(cors());

app.use("/notes", notesRoutes);

mongoose.connect(MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`)
    });
})
.catch((err) => console.log(err))