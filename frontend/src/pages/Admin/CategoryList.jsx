import React, { useState } from 'react';
import { useCreateCategoryMutation, useFetchCategoriesQuery, useRemoveCategoryMutation, useUpdateCategoryMutation } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import CategoryForm from '../../components/CategoryForm';
import Model from '../../components/Model';

const CategoryList = () => {
    const { data: categories } = useFetchCategoriesQuery();
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modelVisible, setModelVisible] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useRemoveCategoryMutation();

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error('Category name is required');
            return;
        }

        try {
            const result = await createCategory({ name }).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                setName('');
                toast.success(`${result.data.name} is created successfully`);
            }
        } catch (error) {
            console.error(error);
            toast.error('Category creation failed');
        }
    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        if (!updatingName) {
            toast.error('Category name is required');
            return;
        }
    
        try {
            const result = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: { name: updatingName },
            }).unwrap();
    
            if (result.error) {
                toast.error(result.error);
            } else if (result.data && result.data.name) {
                toast.success(`${result.data.name} is updated`);
                setSelectedCategory(null);
                setUpdatingName('');
                setModelVisible(false);
            } else {
                toast.error('Failed to update category');
            }
        } catch (error) {
            console.error(error);
            toast.error('Category update failed');
        }
    };

    const handleDeleteCategory = async () => {
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.data.name} is deleted successfully`);
                setSelectedCategory(null);
                setUpdatingName('');
                setModelVisible(false);
            }
        } catch (error) {
            console.error(error);
            toast.error('Category deletion failed');
        }
    };

    return (
        <div className="ml-[10rem] flex flex-col md:flex-row">
            <div className="md:w-3/4 p-3">
                <div className="h-12">Manage Categories</div>

                <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} />
                <br />
                <hr />

                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button
                                className="bg-black border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                                onClick={() => {
                                    setModelVisible(true);
                                    setSelectedCategory(category);
                                    setUpdatingName(category.name);
                                }}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Model isOpen={modelVisible} onClose={() => setModelVisible(false)}>
                <CategoryForm
                    value={updatingName}
                    setValue={setUpdatingName}
                    handleSubmit={handleUpdateCategory}
                    buttonText="Update"
                    handleDelete={handleDeleteCategory}
                />
            </Model>
        </div>
    );
};

export default CategoryList;
