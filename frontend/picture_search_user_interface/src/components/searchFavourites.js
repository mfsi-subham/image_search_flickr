import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const FAV_PHOTOS = gql `{favouritePhotos{photoUrl}}` //gql query for favourite photos

const getFavoritePhotos = () => (
    //Query to get favourite photos
    <Query query={FAV_PHOTOS}>
        {({ loading, error, data }) => {
            if(loading) return 'Loading....'
            if (error) return 'Unable to fetch images right now....please try after sometime'
            return data.favouritePhotos.map(fav => (
                <a key={fav.photoUrl}target='_blank'  href={fav.photoUrl}>
                    <img key={fav.photoUrl} src={fav.photoUrl} alt="not found" style={{ height: 150, width: 150 }}></img>{' '}
                </a>
            ))      
        }}
    </Query>
);

export default getFavoritePhotos