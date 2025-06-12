import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, index: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", index: true },
  price: { type: Number, index: true },
  image: String,
  tags: { type: [String], index: true },
});

productSchema.statics.showList = function (filters, limit, skip, sort) {
  const query = Product.find(filters);
  query.limit(limit);
  query.skip(skip);
  if (sort === "name") {
    query.collation({ locale: "en", strength: 1 });
  }
  query.sort(sort);
  return query.exec();
};

const Product = mongoose.model("Product", productSchema);

export default Product;
