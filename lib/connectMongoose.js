import mongoose from "mongoose";

export default function connectMongoose() {
  return mongoose
    .connect(process.env.DB_CONNECT_STR)
    .then((mongoose) => mongoose.connection);
}

// DB_CONNECT_STR = 'mongodb://localhost/nodepop'
