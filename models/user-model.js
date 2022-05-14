const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  //local register / login
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 1024,
  },

  // //Goolge login
  // name: {
  //   type: String,
  //   required: true,
  //   minLengh: 3,
  //   maxLength: 255,
  // },
  // googleID: {
  //   type: String,
  // },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
  // thumbnail: {
  //   type: String,
  // },
});

//mongoose Schema middleware - encrypt password before save Registration data into database
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    //第一個password 還未被加密，後面this.password 已被加密過
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch); //isMatch 會是true 或 false
  });
};
module.exports = mongoose.model("User", userSchema);
