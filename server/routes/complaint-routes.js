var express = require("express"),
  router = express.Router(),
  Complaint = require("../models/complaint-model").Complaint,
  User = require("../models/user-model").User;
var adminCheck = require("../middlewares/adminCheck");

const keys = require("../config/keys");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: keys.cloudinary.cloudName,
  api_key: keys.cloudinary.apiKey,
  api_secret: keys.cloudinary.apiSecret
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "ttn",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const parser = multer({ storage: storage });

router.param("complaintId", (req, res, next, id) => {
  Complaint.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    req.complaint = doc;
    next();
  });
});

//post new complaint

router.post("/", (req, res, next) => {
  console.log(req.body.complaint);
  const department = req.body.complaint.department;

  User.find({ isAdmin: true, department: department }, (err, users) => {
    let filteredUsers = users.filter(user => user.id !== req.user._id);
    const index = Math.floor(Math.random() * Math.floor(filteredUsers.length));
    const user = req.user;
    let complaint = new Complaint({
      ...req.body.complaint,
      postedBy: user._id,
      assignedTo: filteredUsers[index]._id
    });

    complaint.save().then(complaint => {
      Complaint.findOne(complaint)
        .populate("postedBy")
        .populate("assignedTo")
        .exec((err, complaint) => {
          if (err) next(err);
          res.json(complaint);
        });
    });
    if (err) next(err);
  });
});

//upload picture

router.post("/:complaintId/upload", parser.single("image"), (req, res) => {
  console.log("requesfile", req.file);
  Complaint.update(req.complaint, {
    ...req.body,
    picture: req.file.url
  }).then(() => {
    Complaint.findOne({ _id: req.params.complaintId })
      .populate("postedBy")
      .populate("assignedTo")
      .then(complaint => {
        res.json(complaint);
      });
  });
});

//get complaint by id
router.get("/:complaintId", (req, res) => {
  Complaint.findOne(req.complaint)
    .populate("assignedTo")
    .exec((err, complaint) => {
      if (err) next(err);
      res.json(complaint);
    });
});

//get complaints of user

router.get("/your-complaint/:skip/:limit", (req, res, next) => {
  const limit = parseInt(req.params.limit);
  const skip = parseInt(req.params.skip);

  Complaint.count({ postedBy: req.user._id }, (err, count) => {
    Complaint.find({ postedBy: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("assignedTo")
      .exec((err, complaints) => {
        if (err) next(err);
        const data = {
          complaints: complaints,
          count: count
        };

        res.send(data);
      });
  });
});

//get all the complaints

router.get("/", (req, res, next) => {
  Complaint.find({})
    .sort({ createdAt: -1 })
    .populate("postedBy")
    .populate("assignedTo")
    .exec((err, complaints) => {
      if (err) next(err);
      res.json(complaints);
    });
});

//get complaints for admin to resolve

router.get("/admin-complaint/:skip/:limit", adminCheck, (req, res, next) => {
  const limit = parseInt(req.params.limit);
  const skip = parseInt(req.params.skip);
  Complaint.count({ assignedTo: req.user._id }, (err, count) => {
    Complaint.find({ assignedTo: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("postedBy")
      .exec((err, complaints) => {
        if (err) next(err);
        const data = {
          complaints: complaints,
          count: count
        };

        res.send(data);
      });
  });
});

//change the status of the complaint

router.put("/:complaintId/resolve/:status", adminCheck, (req, res, next) => {
  req.complaint.status = req.params.status;
  req.complaint.updatedAt = Date.now();
  req.complaint.save((err, complaint) => {
    Complaint.findOne(complaint)
      .populate("postedBy")
      .exec((err, complaint) => {
        if (err) next(err);
        res.json(complaint);
      });
  });
});

module.exports = router;
