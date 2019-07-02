const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user-model").User;

var ComplaintSchema = new Schema({
  issueTitle: String,
  concern: { type: String },
  department: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  postedBy: { type: Schema.Types.ObjectId, ref: "User" },
  picture: { type: String },
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Open" }
});

var Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports.Complaint = Complaint;
