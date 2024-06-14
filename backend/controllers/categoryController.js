import Category from '../models/categoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const existCategory = await Category.findOne({ name });
        if (existCategory) {
            return res.status(400).json({ error: "Already exists" });
        }

        const category = await new Category({ name }).save();
        res.status(201).json(category);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});

const removeCategory = asyncHandler(async (req, res) => {
    try {
        const remove = await Category.findByIdAndRemove(req.params.categoryId);
        res.json(remove);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
});    

const listCategories = asyncHandler(async (req, res) => {

    try {

        const all = await Category.find({});
        res.json(all);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }

});
const readCategory = asyncHandler(async (req, res) => {

    try {

        const category = await Category.findById(req.params.id);
        res.json(category);
        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }

});


export { createCategory, updateCategory, removeCategory, listCategories, readCategory }; 
