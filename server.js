const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const notesRoutes = require("./routes/notes");

const app = express();

const PORT = process.env.PORT || 5001
const {DB_USER, DB_PASSWORD} = process.env

const MONGODB_URL = "mongodb+srv://venkatsaipelluru:HARYoIW1KBjZBQFk@notes.lqt9g.mongodb.net/notes?retryWrites=true&w=majority&appName=notes"


app.use(express());
app.use(bodyParser.json());
app.use(cors());

app.use("/notes", notesRoutes);

mongoose.connect(MONGODB_URL)
.then(() =>{
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.log(err))