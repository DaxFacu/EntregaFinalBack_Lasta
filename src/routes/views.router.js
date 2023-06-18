import express from "express";
import { ProductManager } from "../ProductManager.js";
import { ProductModel } from "../DAO/models/products.model.js";

const productManager = new ProductManager("Products.json");

export const viewsRouter = express.Router();

viewsRouter.use(express.json());
viewsRouter.use(express.urlencoded({ extended: true }));

viewsRouter.get("/", (req, res) => {
  let products = productManager.getProducts();
  res.render("home", { products });
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { page, limit, query, sort } = req.query;

    const products = await ProductModel.paginate(
      {},
      {
        limit: limit || 10,
        page: page || 1,
        filter: query || "",
        sort: sort || "",
      }
    );

    res.render("products", {
      // status: "success",
      products: products,
      pagingCounter: products.pagingCounter,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
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
