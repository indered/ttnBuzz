var express = require("express"),
  router = express.Router(),
  Complaint = require("../models/complaint-model").Complaint;

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
  new Complaint(req.body).save().then(complaint => {
    if (!complaint) return next(err);
    res.status(201);
    res.json(complaint);
  });
});

//get all the complaints

router.get("/", (req, res, next) => {
  Complaint.find({})
    .sort({ createdAt: -1 })
    .exec((err, complaints) => {
      if (err) next(err);
      res.json(complaints);
    });
});

//change the status of the complaint

router.put("/:complaintId/:status", (req, res, next) => {
  req.complaint.status = req.params.status;
  req.complaint.updatedAt = Date.now();
  req.complaint.save((err, complaint) => {
    if (err) next(err);
    else res.json(complaint);
  });
});

module.exports = router;
