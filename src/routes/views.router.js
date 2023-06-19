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
    const { page, limit, category, status, sort } = req.query;

    var querySelect = undefined;
    if (category) {
      querySelect = { category: category };
    } else if (status) {
      querySelect = { status: status };
    } else {
      querySelect = undefined;
    }
    const products = await ProductModel.paginate(
      { ...querySelect },
      {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort },
      }
    );

    let product = products.docs.map((product) => {
      return {
        // id: product._id.toString(),
        title: product.title,
        description: product.description,
        stock: product.stock,
        price: product.price,
      };
    });

    res.render("products", {
      status: "success",
      product: product,
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
