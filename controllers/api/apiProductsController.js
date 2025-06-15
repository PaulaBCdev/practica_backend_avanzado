import Product from "../../models/Product.js";

export async function productsList(req, res, next) {
  try {
    const products = await Product.showList();
    res.json({ results: products });
  } catch (error) {
    next(error);
  }
}
