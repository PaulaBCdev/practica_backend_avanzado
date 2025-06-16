import path from "node:path";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import connectMongoose from "./lib/connectMongoose.js";
import * as homeController from "./controllers/homeController.js";
import * as loginController from "./controllers/loginController.js";
import * as productsController from "./controllers/productsController.js";
import * as localeController from "./controllers/localeController.js";
import * as apiProductsController from "./controllers/api/apiProductsController.js";
import * as sessionManager from "./lib/sessionManager.js";
import upload from "./lib/uploadConfigure.js";
import i18n from "./lib/i18nConfigure.js";
import cookieParser from "cookie-parser";

// connect with MongoDB database
await connectMongoose();
console.log("Connected to MongoDB");

const app = express();

// VIEWS CONFIG
app.set("views", "views");
app.set("view engine", "ejs");

app.locals.appName = "NodePop";

// GENERAL MIDDLEWARES
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.json());

// API ROUTES
app.get("/api/products", apiProductsController.productsList);
app.get("/api/products/:productId", apiProductsController.getOneProduct);
app.post(
  "/api/products",
  upload.single("image"),
  apiProductsController.newProduct
);

// WEB_APPLICATION MIDDLEWARES
app.use(cookieParser());

app.use(sessionManager.middleware);
app.use(sessionManager.useSessionInViews);

app.use(i18n.init);
app.get("/change-locale/:locale", localeController.changeLocale);

// WEB_APPLICATION ROUTES
app.get("/", homeController.index);
app.get("/login", loginController.index);
app.post("/login", loginController.login);
app.get("/logout", loginController.logout);
app.get("/products/new", sessionManager.guard, productsController.index);
app.post(
  "/products/new",
  sessionManager.guard,
  upload.single("image"),
  productsController.validateNewProduct,
  productsController.createProduct
);
app.get(
  "/products/delete/:productId",
  sessionManager.guard,
  productsController.deleteProduct
);

// catch 404 and send error
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // manage validation errors
  if (err.array) {
    err.message =
      "Invalid request:  " +
      err
        .array()
        .map((e) => `${e.location} ${e.type} ${e.path} ${e.msg}`)
        .join(", ");

    err.status = 422;
  }

  res.status(err.status || 500);

  // API errors -> response in JSON
  if (req.url.startsWith("/api/")) {
    res.json({ error: err.message });
    return;
  }

  res.locals.message = err.message;
  res.locals.error = process.env.NODEAPP_ENV === "development" ? err : {};

  res.render("error");
});

export default app;
