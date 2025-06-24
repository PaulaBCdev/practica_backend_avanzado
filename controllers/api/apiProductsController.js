import Product from "../../models/Product.js";
import { unlink } from "node:fs/promises";
import path from "node:path";
import cote from "cote";
import createError from "http-errors";

export async function productsList(req, res, next) {
  try {
    const userId = req.apiUserId;

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
    const userId = req.apiUserId;

    const product = await Product.findOne({ _id: productId, owner: userId });

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
}

// Thumbnail requester
const requester = new cote.Requester({
  name: "Create Thumbnail",
  namespace: "NodeApp",
});

export async function newProduct(req, res, next) {
  try {
    const productData = req.body;
    const userId = req.apiUserId;

    // create product in memory
    const product = new Product(productData);
    product.image = req.file?.filename;
    product.owner = userId;

    // save product
    const savedProduct = await product.save();

    // create thumbnail
    if (product.image) {
      const fullImagePath = path.join(
        process.cwd(),
        "public",
        "images",
        product.image
      );
      const event = {
        type: "create-thumbnail",
        originalPath: fullImagePath,
      };

      requester.send(event, (result) => {
        console.log(result);
      });
    }

    res.status(201).json({ result: savedProduct });
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const productId = req.params.productId;
    const userId = req.apiUserId;

    const productData = req.body;
    productData.image = req.file?.filename;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, owner: userId },
      productData,
      { new: true }
    );

    res.json({ result: updatedProduct });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const productId = req.params.productId;
    const userId = req.apiUserId;

    const product = await Product.findById(productId);

    // check if product exists
    if (!product) {
      console.log(
        `WARNING! user ${userId} is trying to delete non existing products`
      );
      return next(createError(404));
    }

    // check product's owner
    if (product.owner.toString() !== userId) {
      console.log(
        `WARNING! user ${userId} is trying to delete other users' products!!!`
      );
      return next(createError(401));
    }

    // if there is image, delete it
    if (Product.image) {
      await unlink(
        path.join(
          import.meta.dirname,
          "..",
          "..",
          "public",
          "images",
          product.image
        )
      );
    }

    // delete product
    await Product.deleteOne({ _id: productId });

    res.json();
  } catch (error) {
    next(error);
  }
}
