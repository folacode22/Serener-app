const Item = require("../model/item_model");
const User = require("../model/user_model");

exports.addItem = async (req, res) => {
  const id = req.params._id;

  //check if user exist in database
  const user = await User.findOne({ userId: id });

  //authorization
  if (user.role !== "admin") {
    return res.status(401).json({ message: "Not authorized" });
  }
  const { userId, drink, confectionary, price } = req.body;

  try {
    const item = await Item.create({
      userId,
      drink,
      confectionary,
      price,
    });
    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.allItem = async (req, res) => {
  try {
    const q = req.query.price;
    const { page, limit } = req.query;
    const items = await Item.find()
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit * 3);
    return res.status(200).json({ count: items.length, data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.selectItem = async (req, res) => {};
