var express = require("express");
var router = express.Router();

const apiEnquiryController = require("../controllers/api/enquiryController");

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
router.post("/createEnquiry", use(apiEnquiryController.createEnquiry));
module.exports = router;