import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checKId.js";
import { addProduct } from "../controllers/productController.js";
import { updateProductDetails,
     removeProduct, 
     fetchProducts, 
     fetchProductsById, 
     fetchAllProducts,
     reviewProduct,
     fetchTopAllProducts,
     fetchNewProducts } from "../controllers/productController.js";

const router = express.Router();

// Define the /allproducts route before the /:id route
router.route("/allproducts").get(fetchAllProducts);
router.route("/top").get(fetchTopAllProducts);
router.route("/new").get(fetchNewProducts);

router.route("/:id/reviews").post(authenticate, authorizedAdmin, checkId, reviewProduct);


router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizedAdmin, formidable(), addProduct);

router
  .route("/:id")
  .put(authenticate, authorizedAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizedAdmin, formidable(), removeProduct)
  .get(fetchProductsById);

export default router;
