import React from 'react'
import GetFavouritePhotos from './searchFavourites'

const FavouritePhotos = () => {
    // It will render favourite marked photos from the database
    
    return (
        <div>
            <div className='p-4 bg-secondary'></div>
            <div className='p-5 row justify-content-md-center align-content-center bg-dark text-white'>
                <GetFavouritePhotos/>
            </div>
        </div>
    );

}
export default FavouritePhotos
