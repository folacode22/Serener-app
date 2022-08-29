require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../model/user_model");

exports.userSignUp = async (req, res) => {
  const { firstName, lastName, age, email, password, phoneNumber } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      age,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    user.save();
    return res
      .status(201)
      .json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

exports.userLogIn = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!(password && email)) {
      return res.status(400).json({ message: "please fill all fields" });
    }

    // check if user exist in database
    const existingUser = await User.findOne({ email: email });

    //if user doessn't exist throw error
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }

    //console.log(existingUser);

    //if  user exist in database, check if user password is correct
    const checkPassword = await bcrypt.compare(password, existingUser.password);

    //if user password is not coorect throw error ==> invalid credentials
    if (!checkPassword) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // if user password is correct tokenize the payload
    const payload = {
      _id: existingUser._id,
    };

    // tokenize your payload with a secret key to create an access token
    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    //store token in cookies ===> web brower local storage

    res.cookie("accessToken", token);
    return res
      .status(202)
      .json({ message: "User login successfully", token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

//view all items by user
exports.allItems = async (req, res) => {
  try {
    const items = await Item.find();
    const dataInfo = {
      count: `${item.lenght} items available`,
      items,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

//admin  todo
exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    // if (User.role !== "admin") {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    const dataInfo = {
      count: `${users.length} users on the platform`,
      users,
    };

    return res.status(200).json(dataInfo);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

//admin can search user by email
exports.findUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    // if (User.role !== "admin") {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
    // const counts = await User.countDocuments();

    return res.status(200).json({ message: "All Users Email", user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

exports.switchAdmin = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await User.findOneAndUpdate(
      id,
      { role: "admin" },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};
