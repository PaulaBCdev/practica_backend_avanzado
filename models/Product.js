import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "User", index: true },
  price: Number,
  image: String,
  tags: [String],
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
