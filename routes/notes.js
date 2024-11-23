const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const validateNote = require("../middleware/validateNote");

// Create a new note
router.post("/", validateNote, async(req, res) =>{
    try{
        const note = await Note.create(req.body);
        await note.save();
        res.status(201).json(note);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Get all notes
router.get("/", async(req, res) =>{
    const {category, search} = req.query;
    const filter = {};
    try{
        if (category) filter.category = category;
        if (search) filter.title = new RegExp(search, "i");

        const notes = await Note.find(filter).sort({createdAt: -1});
        res.json(notes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Update note by Id
router.put("/:id", async(req, res) =>{
    try{
        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json(note);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Delete note by Id
router.delete("/:id", async(req, res) =>{
    try{
        const note = await Note.findByIdAndDelete(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json({message: "Note deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
        
});

module.exports = router;