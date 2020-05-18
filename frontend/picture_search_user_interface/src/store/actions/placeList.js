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
            url: 'http://localhost:8000/graphql/',
            method: 'post',
            data: {
                query: `{coordinates{placeName}}`
            }
        })
        .then(result => {
            console.log(result.data.data.coordinates)
            dispatch(placeFetchSuccess(result.data.data.coordinates))
        })
        .catch(error => {
            console.log(error)
            dispatch(placeFetchFail(error))
        })
    }
}