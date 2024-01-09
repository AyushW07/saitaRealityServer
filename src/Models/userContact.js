const mongoose = require("mongoose");
const userContactSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },

    Name: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Property: {
      type: String,
    },
    Message: {
      type: String,
    },
    AboutUs: {
      type: String,
    },
    Published: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("UserContact ", userContactSchema);
