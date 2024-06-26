import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    useCreateProductMutation,
useUploadProductImageMutation
} from '../../redux/api/productAPiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import AdminMenu from './AdminMenu';



const ProductList =() =>{
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setStock] = useState(0);
    const [imageUrl, setImageURL] = useState(null);
    const navigate = useNavigate();


    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const {data: categories} = useFetchCategoriesQuery();

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);

        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageURL(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {

            const formData  = new FormData();
            formData .append('image', image)
            formData .append('name', name)
            formData .append('description', description)
            formData .append('price', price)
            formData .append('quantity', quantity)
            formData .append('category', category)
            formData .append('brand', brand)
            formData .append('countInStock', countInStock)

            const {data} = await createProduct(formData );
            if(data.error){
                toast.error("Produt failed, Try Again");  
            }else {
                    toast.success(`${data.name} is created`);
                    console.log(data);
                    navigate("/");
                }
                


            
        } catch (error) {
            toast.error("Produt failed, Try Again");
            console.error(error)
            
        }
    };


  return <div className='container xl:mx-[9rem] sm:mx-[0]'>
    <div className=' flex flex-col md:flex-row'>
        <AdminMenu />
       <div className="md:w-3/4 p-3">
        <div className="h-12">Create Product</div>

        {imageUrl &&(
            <div className="text-center">
                <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]"></img>
            </div>
        )}
            <div className="mb-3">
                <label className='border text-white 
                px-4 block w-full text-senter 
                rounded-lg cursor-pointer 
                font-bold py-11'>
                    {image ? image.name : "Upload Image"}
                    <input type='file' name='image' accept='image/*' 
                    onChange={uploadFileHandler}
                    className={!image ? "hidden" : "text-white"}
                    ></input>
                </label>
            </div>

            <div className="p-3">
                <div className="flex flex-row">
                    <div className='one'>
                        <label className='name'>Name</label><br></br>
                        <input type='text' className='p-4 mb-3 w-[30rem] 
                        border rounded-lg bg-[#101011]
                        text-white' value={name} 
                        onChange={e => setName(e.target.value)}/>
                    </div>

                    <div className='two ml-10'>
                        <label className='name block'>Price</label>
                        <input type='number' className='p-4  w-[30rem] border rounded-lg bg-[#101011]
                        text-white' value={price} 
                        onChange={e => setPrice(e.target.value)}/>
                    </div>

                </div>
                <div className="flex flex-row">
                    <div className='one'>
                        <label className='name block'>Quantity</label>
                        <input type='number' className='p-4 mb-3 w-[30rem] 
                        border rounded-lg bg-[#101011]
                        text-white' value={quantity} 
                        onChange={e => setQuantity(e.target.value)}/>
                    </div>

                    <div className='two ml-10'>
                        <label className='name block'>Brand</label>
                        <input type='text' className='p-4  w-[30rem] border rounded-lg bg-[#101011]
                        text-white' value={brand} 
                        onChange={e => setBrand(e.target.value)}/>
                    </div>
                </div>
                
                <label htmlFor='' className='my-5'>Description</label>
                <textarea typeof='text' className='p-2 mb-3  
                        border rounded-lg bg-[#101011] w-[95%]
                        text-white' value={description}
                        onChange={e => setDescription(e.target.value)}>
                </textarea>

                <div className="flex justify-between">
                    <div className='one'>
                        <label className='name block'>Count in Stock</label>
                        <input type='number' className='p-4 mb-3 w-[30rem] 
                        border rounded-lg bg-[#101011]
                        text-white' value={countInStock} 
                        onChange={e => setStock(e.target.value)}/>
                    </div>
                    <div className='two ml-10'>
                    <label htmlFor=''>Category</label><br></br>
                    <select aria-placeholder='Choose category' className='p-4 mb-3 w-[30rem] 
                        border rounded-lg bg-[#101011]
                        text-white' onChange={e => setCategory(e.target.value)}>
                            {categories?.map((c) =>(
                            <option key={c._id} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button 
                onClick={handleSubmit} 
                className='py-4 px-10 mt-5 rounded-lg text-lg
                font-bold bg-pink-600'>Submit</button>


            </div>
       </div> 
    </div>
  </div>
  
}

export default ProductList;