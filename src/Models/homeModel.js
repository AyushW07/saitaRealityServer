const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    Photos: {
      type: [String],
    },
    Description: {
      type: String,
    },
    Price: {
      type: String,
    },
    Dollar: {
      type: String,
    },
    Key: {
      type: [String],
    },
    Location: {
      type: [String],
    },
    Bedrooms: {
      type: String,
    },
    Bathrooms: {
      type: String,
    },
    Area: {
      type: String,
    },
    propertyName: {
      type: String,
    },
    Published: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Homesaita", HomeSchema);
