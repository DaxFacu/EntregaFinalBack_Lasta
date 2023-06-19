import express from "express";
import { cartsService } from "../services/carts.service.js";
import { CartModel } from "../DAO/models/carts.model.js";

export const routerCarts = express.Router();

routerCarts.use(express.json());
routerCarts.use(express.urlencoded({ extended: false }));

// const cartManager = new CartManager("cart.json");

routerCarts.post("/", (req, res) => {
  const cart = req.body;

  const createCart = cartsService.createCart();
  if (createCart) {
    return res.status(201).json({
      msg: "Carrito creado ",
      data: {},
    });
  } else {
    return res.status(400).json({
      msg: "No se pudo crear el carrito",
      data: {},
    });
  }
});

routerCarts.get("/", async (req, res) => {
  try {
    const getCart = await cartsService.getAllCarts({});

    return res.status(201).json({
      status: "success",
      msg: "Get cart",
      data: getCart,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

routerCarts.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const getCart = await cartsService.findCart(cid);

    return res.status(201).json({
      status: "success",
      msg: "Get cart",
      data: getCart,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});

// routerCarts.get("/:cid", async (req, res) => {
//   try {
//     const { cid, pid } = req.params;

//     const getCart = await cartsService.findCart(cid);

//     return res.status(201).json({
//       status: "success",
//       msg: "Get cart",
//       data: getCart,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: "error",
//       msg: "something went wrong :(",
//       data: {},
//     });
//   }
// });

routerCarts.put("/:cid", async (req, res) => {
  try {
    const { id } = req.params;
    const { product } = req.body;

    const cartUptaded = await cartsService.updateCart(id, product);
    return res.status(201).json({
      status: "success",
      msg: "product uptaded",
      data: cartUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "something went wrong :(",
      data: {},
    });
  }
});
