import { CartModel } from "../DAO/models/carts.model.js";

class CartsService {
  async getAllCarts() {
    const carts = await CartModel.find();
    return carts;
  }

  async createCart() {
    const cartCreated = await CartModel.create({});
    return cartCreated;
  }

  async findCart(id) {
    const cartFind = await CartModel.findOne({ _id: id });
    return cartFind;
  }

  async updateCart(cid, pid) {
    const cartUpdated = await CartModel.updateOne({ _id: cid }, { pid });
    return cartUpdated;
  }

  async deleteProduct(id) {
    const deleted = await CartModel.deleteOne({ _id: id });
    return deleted;
  }
}

export const cartsService = new CartsService();
