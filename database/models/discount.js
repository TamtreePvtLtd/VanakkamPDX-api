const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    mobileNumber: String,
  },
  { timestamps: true }
);

const EnquiryModel = mongoose.model("Enquiry", EnquirySchema);

module.exports = EnquiryModel;
