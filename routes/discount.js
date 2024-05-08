var express = require("express");
var router = express.Router();

const apiDiscountController = require("../controllers/api/discountController");

const use = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
router.post("/createDiscount", use(apiDiscountController.createDiscount));
module.exports = router;
