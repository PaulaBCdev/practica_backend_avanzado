import Product from "../models/Product.js";

export async function index(req, res, next) {
  try {
    const userId = req.session.userId;

    // Filters
    const filterName = req.query.name;
    const filterPrice = req.query.price;
    const filterTags = req.query.tags;

    /* const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = (page - 1) * limit; */

    const filters = {
      owner: userId,
    };

    if (filterName) {
      filters.name = new RegExp(`${filterName}`, "i"); // filter name that contains filterName
    }

    if (filterPrice) {
      filters.price = filterPrice;
    }

    if (filterTags) {
      const tagsArray = filterTags.split(",");
      filters.tags = { $in: tagsArray };
    }

    res.locals.products = await Product.find(filters);
    /* .skip(startIndex)
      .limit(limit); */

    res.render("home");
  } catch (error) {
    next(error);
  }
}
