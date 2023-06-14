const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');
const nodemailer = require("nodemailer");
const crypto = require("crypto");


exports.editProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }
    console.log(req.file)
    if (req.file) {
      user.photo.data = fs.readFileSync(req.file.path);
      user.photo.contentType = req.file.mimetype;
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.deleteProfile = async (req, res) => {
      await User.findByIdAndDelete(req.user._id);
      res.status(202).json({ message: 'User deleted' });
};


exports.deletePhoto = async (req, res) => {
    try {
      const user = req.user
      
      if(!user.photo) {
        res.status(200).json({ message: 'There is No Photo' })
      }

      if(user.photo) {
        user.photo = undefined
        await user.save()
        res.status(200).json({ message: 'Photo deleted successfully' })
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
};



exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send("user does not exist")
    } else {
        const resetToken = await user.createPasswordResetToken();
        await user.save({ validateBeforeSave: false });
        res.status(200).json({
        status: "success",
        token: resetToken,
      });
    }

  // //1)Get user based on email
  // const user = await User.findOne({ email: req.body.email });
  // if (!user) {
  //   throw error("user does not exist");
  // }
  // //2)Generate random token
  // const resetToken = await user.createPasswordResetToken();
  // await user.save({ validateBeforeSave: false });
  // //3)Send it to user's email
  // const message = `You requested a password reset. Click <a href="http://localhost:3000/login/resetPassword?token=${resetToken}">here</a> to reset your password`;
  // try {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "yosefelsawy406@gmail.com",
  //       pass: "ylxmuyxtvbsnsmnr",
  //     },
  //   });

  //   const mailOptions = {
  //     from: "yosefelsawy406@gmail.com",
  //     to: "omarhishamho@gmail.com",
  //     subject: "Password Reset Request",
  //     html: message,
  //   };

  //   await transporter.sendMail(mailOptions);

  //   res.status(200).json({
  //     status: "success",
  //     message: "token sent to email",
  //   });
  // } catch (err) {
  //   user.passwordResetToken = undefined;
  //   user.passwordResetExpires = undefined;
  //   await user.save({ validateBeforeSave: false });
  //   console.log("error sending email");
  // }
};


exports.resetPassword = async (req, res) => {
  //1)Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2)if token not expirted and user exists -> set new password
  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "Invalid or expired verification token.",
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  //3)Update changePassword for user

  res.status(200).json({
    status: "success",
    message: "password updated",
  });
};