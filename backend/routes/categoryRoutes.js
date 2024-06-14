import express from "express";
import { authorizedAdmin, authenticate } from '../middlewares/authMiddleware.js'
import { createCategory, updateCategory, removeCategory, listCategories, readCategory } from "../controllers/categoryController.js";


const router = express.Router();
router.route('/').post(authenticate, authorizedAdmin, createCategory);
router.route('/categories/:categoryId').put(authenticate, authorizedAdmin, updateCategory);
router.route('/categories/:categoryId').delete(authenticate, authorizedAdmin, removeCategory);
router.route('/:categories').get(listCategories);
router.route('/:id').get(readCategory);  // Read a single category by ID



export default router;