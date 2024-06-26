import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsByIdQuery,
  useUploadProductImageMutation
} from '../../redux/api/productAPiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductsByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [countInStock, setStock] = useState(productData?.countInStock || "");

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
        setImage(productData.image);
        setName(productData.name);
        setDescription(productData.description);
        setPrice(productData.price);
        setQuantity(productData.quantity);
        setCategory(productData.category?._id);
        setBrand(productData.brand);
        setStock(productData.countInStock);
    }
  }, [productData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", countInStock);
  
      // Log form data
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      // Update product using the RTK Query mutation
      const data = await updateProduct({ productId: params._id, formData });
  
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproducts");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };
  
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (error) {
      toast.error("Image upload failed, try again");
    }
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm("Are you sure you want to delete this Product?");
      if (!answer) return;
      const { data } = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted Successfully`);
      navigate('/admin/allproducts');
    } catch (error) {
      toast.error("Delete failed, Try Again");
      console.error(error);
    }
  };

  return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
      <div className='flex flex-col md:flex-row'>
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {image && (
            <div className="text-center">
              <img src={image} alt="product" className="block mx-auto max-h-[200px]" />
            </div>
          )}
          <div className="mb-3">
            <label
              htmlFor='image'
              className='border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11'
            >
              {image ? image.name : "Upload Image"}
              <input
                type='file'
                id='image'
                name='image'
                accept='image/*'
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-row">
              <div className='one'>
                <label htmlFor='name' className='name'>Name</label><br />
                <input
                  type='text'
                  id='name'
                  className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className='two ml-10'>
                <label htmlFor='price' className='name block'>Price</label>
                <input
                  type='number'
                  id='price'
                  className='p-4 w-[30rem] border rounded-lg bg-[#101011] text-white'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row">
              <div className='one'>
                <label htmlFor='quantity' className='name block'>Quantity</label>
                <input
                  type='number'
                  id='quantity'
                  className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>

              <div className='two ml-10'>
                <label htmlFor='brand' className='name block'>Brand</label>
                <input
                  type='text'
                  id='brand'
                  className='p-4 w-[30rem] border rounded-lg bg-[#101011] text-white'
                  value={brand}
                  onChange={e => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor='description' className='my-5'>Description</label>
            <textarea
              id='description'
              className='p-2 mb-3 border rounded-lg bg-[#101011] w-[95%] text-white'
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="flex justify-between">
              <div className='one'>
                <label htmlFor='countInStock' className='name block'>Count In Stock</label><br />
                <input
                  type='number'
                  id='countInStock'
                  className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                  value={countInStock}
                  onChange={e => setStock(e.target.value)}
                />
              </div>
              <div className='two ml-10'>
                <label htmlFor='category' className='block'>Category</label><br />
                <select
                  id='category'
                  className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={handleSubmit}
                className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6'
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
