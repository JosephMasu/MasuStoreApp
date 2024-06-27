//Add a product to a localStorsge
export const addFavoriteToLocatStorage = (product) =>{
    const favorites = getFavoritesFromStorage();
    if(!favorites.some((p) =>p._id == product._id)){
        favorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

//remove product From localStorage
export const RemoveFavoriteToLocatStorage = (productId) =>{
    const favorites = getFavoritesFromStorage();
    const updateFavorites = favorites.filter((product) =>product._id !=productId);
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
}

//retrieve favorites from a localStorage

export const getFavoritesFromStorage = ()=>{
    const favoritesJson = localStorage.getItem('favorits');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
}