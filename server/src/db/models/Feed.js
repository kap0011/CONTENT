const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true,
    },
    tags:{
      type: Array,
    }
  },
  {
    timestamps: true,
  }
);

// Create Contacts collection
const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
