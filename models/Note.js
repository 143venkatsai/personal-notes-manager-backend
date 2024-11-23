const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ["Work", "Personal", "Others"], default: "Others" },
    completed: { type: Boolean, default: false}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Note", noteSchema);