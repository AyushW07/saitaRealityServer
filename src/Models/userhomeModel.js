const mongoose = require("mongoose");
const userhomeSchema = new mongoose.Schema(
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
module.exports = mongoose.model("UserData", userhomeSchema);
