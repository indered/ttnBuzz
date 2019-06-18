const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ComplaintSchema = new Schema({
  concern: { type: String },
  department: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  name: { type: String },
  email: { type: String },
  attachment: { type: String },
  assignedTo: String,
  status: String
});

var Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports.Complaint = Complaint;
