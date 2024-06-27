import React from 'react'
import { useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { addToFavorites,
    removeToFavorites, setFavorites
 } from '../../redux/features/favorites/favoriteSlice'
 import { addFavoriteToLocatStorage,
    RemoveFavoriteToLocatStorage,
    getFavoritesFromStorage
  } from '../../Utils/localStorage'


const HeartIcon = (product)=> {
    const dispatch = useDispatch();
    const favorites = useSelector((state)=> state.favorites) || [];
    const isFavorite = favorites.some((p) =>p._id == product._id);

    useEffect(() =>{
        const favoritesFromLocalStorage = getFavoritesFromStorage()
        dispatch(setFavorites(favoritesFromLocalStorage));
    },[]);

    const toggleFavorites = ()=>{
        if(isFavorite){
            dispatch(removeToFavorites(product));
            //removing the product from the local storage as well
            RemoveFavoriteToLocatStorage(product._id);

        }else{
            dispatch(addToFavorites(product));
            //add the product to the local storage as well
            addFavoriteToLocatStorage(product._id);
        }
    }
  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer'>
        {isFavorite ? (
            <FaHeart className='text-pink-500' />) :(
            <FaRegHeart className='text-blue' />
        )}
      
    </div>
  );
}

export default HeartIcon
