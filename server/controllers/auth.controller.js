const UserModel = require('../models/user.model');
const asyncHanlder = require('express-async-handler');
const bcrypt = require('bcryptjs');

exports.regsiterUser = asyncHanlder(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userName = await UserModel.findOne({ username });
    if (userName) {
      res.status(400);
      throw new Error('Username already taken');
    }
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      res.status(400);
      throw new Error('email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    const { password: pass, ...rest } = user._doc;
    res.status(201).json({ status: true, rest });
  } catch (error) {
    res.status(500);
    throw new Error('internal server error', error);
  }
});

exports.loginUser = asyncHanlder(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ status: false, message: 'All fields are required' });
    return;
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(400).json({ status: false, message: 'User does not exist' });
    return;
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    res.status(400).json({ status: false, message: 'Invalid password' });
    return;
  }

  const { password: pass, ...rest } = user._doc;
  res.status(200).json({ status: true, rest });
});

exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

exports.allUsers = asyncHanlder(async (req, res, next) => {
  try {
    //find all users exccept me
    const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

exports.logout = asyncHanlder(async(req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
})