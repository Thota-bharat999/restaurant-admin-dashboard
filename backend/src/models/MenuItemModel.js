import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, // for faster filtering
    },

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    ingredients: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    preparationTime: {
      type: Number, 
      min: 0,
    },

    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

//Text search index 
menuItemSchema.index({
  name: "text",
  ingredients: "text",
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
