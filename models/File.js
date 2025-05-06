const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null },
    userId: { type: String, required: true },
    url: { type: String }, // Only for files
  },
  { timestamps: true }
);

module.exports = mongoose.model("File", fileSchema);
