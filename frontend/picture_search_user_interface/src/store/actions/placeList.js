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
            
            dispatch(placeFetchSuccess(result.data.data.coordinates))
        })
        .catch(error => {
            console.log(error)
            dispatch(placeFetchFail(error))
        })
    }
}

//------Fetching Lat Long of a place--------//
export const latLongFetchStart = () => {
    return{
        type: actionTypes.FETCH_LAT_LONG_DATA_START
    };
};


export const latLongFetchSuccess = (coordinates) => {
    
    return{
        type: actionTypes.FETCH_LAT_LONG_DATA_SUCCESS,
        lat: coordinates['latitude'],
        long: coordinates['longitude']
    };
};

export const latLongFetchFail = (error) => {
    return{
        type: actionTypes.FETCH_LAT_LONG_DATA_FAIL,
        error: error
    };
};

export const fetchLatLongData = (option) => {
    return dispatch => {
        dispatch(latLongFetchStart())
        axios({
            url: 'http://localhost:8000/graphql/',
            method: 'post',
            data: {
                query: `{coordinate(placeName: "${option}"){latitude longitude}}`
            }
        })
        .then(result => {
            dispatch(latLongFetchSuccess(result.data.data.coordinate))
            
        })
        .catch(error => {
            console.log(error)
            dispatch(latLongFetchFail(error))
        })
    }
}