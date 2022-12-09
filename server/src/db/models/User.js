const mongoose = require("mongoose");
const validate = require("validate");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    contactNo: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Contact Number is not valid!");
        }
        if (value?.toString().length > 10) {
          throw new Error("Upto 10 digit long Contact Number is valid!");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create Contacts collection
const User = mongoose.model("User", userSchema);

module.exports = User;

