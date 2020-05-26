import * as actionTypes from './actionTypes'
import axios from 'axios'

export const placeFetchStart = () => {
    return{
        type: actionTypes.PLACE_FETCH_START
    };
};


export const placeFetchSuccess = (placeList) => {
    return{
        type: actionTypes.PLACE_FETCH_SUCCESS,
        placeList: placeList
    };
};

export const placeFetchFail = (error) => {
    return{
        type: actionTypes.PLACE_FETCH_FAIL,
        error: error
    };
};


export const placeFetch = () => {
    return dispatch => {
        dispatch(placeFetchStart())
        axios({
            url: process.env.REACT_APP_API_URL,
            method: 'post',
            data: {
                query: `{coordinates{placeName}}`
            }
        })
        .then(result => {
            dispatch(placeFetchSuccess(result.data.data.coordinates))           
        })
        .catch(error => {
            dispatch(placeFetchFail(error))
        });
    };
};



