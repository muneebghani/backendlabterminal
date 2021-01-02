var express = require("express");
var router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
var Product = require("../models/product");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  console.log(products);
  res.render("products/list", {
    products,
  });
});

router.get("/listofproducts", async function (req, res, next) {
  let products = await Product.find();
  return res.send(products);
});

router.get("/add", async function (req, res, next) {
  res.render("products/add");
});
// store data in db
router.post("/add", upload.single("prImage"), async function (req, res, next) {
  const result = await cloudinary.uploader.upload(req.file.path);
  let product = new Product({
    prImage: result.secure_url,
    prName: req.body.prName,
    prCategory: req.body.prCategory,
    prPrice: req.body.prPrice,
    prDetails: req.body.prDetails,
    cloudinary_id: result.public_id,
  });
  await product.save();
  res.redirect("/products");
});
router.get("/delete/:id", async function (req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  res.redirect("/products");
});
router.get(
  "/edit/:id",
  upload.single("image"),
  async function (req, res, next) {
    let product = await Product.findById(req.params.id);
    await cloudinary.uploader.destroy(product.cloudinary_id);
    res.render("products/edit", { product });
  }
);
router.post(
  "/edit/:id",
  upload.single("image"),
  async function (req, res, next) {
    let product = await Product.findById(req.params.id);
    const result = await cloudinary.uploader.upload(req.file.path);
    product.prImage = result.secure_url;
    product.prName = req.body.prName;
    product.prCategory = req.body.prCategory;
    product.prPrice = req.body.prPrice;
    product.prDetails = req.body.prDetails;
    product.cloudinary_id = result.public_id;
    await product.save();
    res.redirect("/products");
  }
);

module.exports = router;
