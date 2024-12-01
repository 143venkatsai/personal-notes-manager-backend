const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const validateNote = require("../middleware/validateNote");
const authenticate = require("../middleware/authenticate");

// Create a new note
router.post("/",authenticate, validateNote, async(req, res) =>{
    try{
        const note = await Notes.create({...req.body, userId: req.user._id});
        await note.save();
        res.status(201).json(note);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Get all notes
router.get("/", authenticate, async(req, res) =>{
    const {category, search} = req.query;
    const filter = {userId: req.user._id};
    try{
        if (category) filter.category = category;
        if (search) filter.title = new RegExp(search, "i");

        const notes = await Notes.find(filter).sort({createdAt: -1});
        res.json(notes);
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Update note by Id
router.put("/:id", authenticate, async(req, res) =>{
    try{
        const note = await Notes.findByIdAndUpdate({_id: req.params.id, userId: req.user.id}, req.body, {new: true});
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json({message: "Note deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

// Delete note by Id
router.delete("/:id", authenticate, async(req, res) =>{
    try{
        const note = await Notes.findByIdAndDelete({_id:req.params.id, userId: req.user.id});
        if(!note) return res.status(404).json({message: "Note not found"});
        res.json({message: "Note deleted successfully"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
        
});

module.exports = router;