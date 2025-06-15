import Product from "../models/Product.js";

export async function index(req, res, next) {
  try {
    const userId = req.session.userId;

    // Filters
    const filterName = req.query.name;
    const filterPrice = req.query.price;
    const filterTags = req.query.tags;

    // Pagination
    const limit = req.query.limit;
    const skip = req.query.skip;

    // Sort
    const sort = req.query.sort;

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
      filters.tags = { $all: tagsArray };
    }

    res.locals.products = await Product.showList(filters, limit, skip, sort);

    res.render("home");
  } catch (error) {
    next(error);
  }
}
