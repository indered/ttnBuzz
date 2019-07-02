const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user-model").User;

var sortComments = function(a, b) {
  return b.updatedAt - a.updatedAt;
};

var CommentSchema = new Schema({
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  commentedBy: { name: String, id: String }
});

var ReactionSchema = new Schema({
  type: String,
  reactedBy: {
    name: String,
    id: String
  }
});

var BuzzSchema = new Schema({
  text: { type: String },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  comments: [CommentSchema],
  reactions: [ReactionSchema],
  picture: String,
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

BuzzSchema.pre("save", function(next) {
  this.comments.sort(sortComments);
  // 	if(a.updatedAt>b.updatedAt)
  // 		return -1;
  // 	else if(a.updatedAt<b.updatedAt)
  // 		return 1;
  // 	else return 0;

  next();
});

var Buzz = mongoose.model("Buzz", BuzzSchema);

module.exports.Buzz = Buzz;
module.exports = Buzz;
