//@ts-check
import { Schema, model } from "mongoose";

const schema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: { type: Number },
      },
    ],
    required: true,
  },
});

export const CartModel = model("carts", schema);
