import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FAV_PHOTOS = gql `{favouritePhotos{photoUrl}}` //gql query for favourite photos

const getFavoritePhotos = () => (
    //Query to get favourite photos from db 
    <Query query={FAV_PHOTOS}>
        {({ loading, error, data }) => {
            if(loading) return 'Loading....'
            if (error) return <h5 className="text-danger text-center"><strong>Unable to display images right now....please try after sometime</strong></h5>
            
            return data.favouritePhotos.map(fav => (
                    <div className='card bg-light' style={{ width: 200 }}>
                        <a key={fav.photoUrl} target='_blank' rel='noopener noreferrer' href={fav.photoUrl}>
                            <img className='m-2' key={fav.photoUrl} src={fav.photoUrl} alt="not found" style={{ height: 200, width: 180 }}></img>
                        </a>
                    </div>
            ))      
        }}
    </Query>
);

export default getFavoritePhotos