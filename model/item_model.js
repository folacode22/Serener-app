const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    drinks: {
      type: String,
      enum: [
        "hennessy",
        "divaVodka",
        "johnnieWalker",
        "brandy",
        "smirnoff",
        "blackLabel",
      ],
    },
    confectionary: {
      type: String,
      enum: ["candyPatisserie", "nutsCake", "creamCake"],
    },
    price: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
