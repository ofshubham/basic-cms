const mongoose = require("../connection");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  //   created_by: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //   },
  //   updated_by: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //   },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
