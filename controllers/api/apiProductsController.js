import Product from "../../models/Product.js";

export async function productsList(req, res, next) {
  try {
    // Filters
    const filterName = req.query.name;
    const filterPrice = req.query.price;
    const filterTags = req.query.tags;

    // Pagination
    const limit = req.query.limit;
    const skip = req.query.skip;

    // Sort
    const sort = req.query.sort;

    // Fields selection
    const fields = req.query.fields;

    // With total count (optional)
    const withCount = req.query.count === "true";

    const filters = {
      //owner: userId,
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

    const products = await Product.showList(filters, limit, skip, sort, fields);
    const result = { results: products };

    if (withCount) {
      const count = await Product.countDocuments(filters);
      result.count = count;
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getOneProduct(req, res, next) {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
}

export async function newProduct(req, res, next) {
  try {
    const productData = req.body;

    // create product in memory
    const product = new Product(productData);
    product.image = req.file?.filename;

    // save product
    const savedProduct = await product.save();

    res.status(201).json({ result: savedProduct });
  } catch (error) {
    next(error);
  }
}
