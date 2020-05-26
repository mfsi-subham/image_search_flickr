import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchFlickrDataStart = () => {
    return{
        type: actionTypes.FETCH_FLICKR_DATA_START
    };
};


export const fetchFlickrDataSuccess = (result, lat, long) => {

    let photoList = result.data.photos.photo
    let pageNo = result.data.photos.page
    
    return{
        type: actionTypes.FETCH_FLICKR_DATA_SUCCESS,
        photoList: photoList,
        page:pageNo,
        lat: lat,
        long: long

    };
};

export const fetchFlickrDataFail = (error) => {

    return{
        type: actionTypes.FETCH_FLICKR_DATA_FAIL,
        error: error
    };
};

export const fetchFlickrData = (lat, long, page) => {

    return dispatch => {
        dispatch(fetchFlickrDataStart())

        let baseUrl = process.env.REACT_APP_FLICKR_URL
        let method = 'flickr.photos.search'
        let api_key = process.env.REACT_APP_FLICKR_API_KEY
        let accuracy = process.env.REACT_APP_FLICKR_ACCURACY
        let perPage = process.env.REACT_APP_FLICKR_PER_PAGE
        let format = 'json'
        let url = baseUrl+'?method='+method+'&api_key='+api_key+'&accuracy='+accuracy+'&lat='+lat+'&lon='+long+'&per_page='+perPage+'&page='+page+'&format='+format+'&nojsoncallback=1'
        
        axios.get(url)
        .then(result => {
            dispatch(fetchFlickrDataSuccess(result, lat, long))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchFlickrDataFail(error))
        })
    };
};

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
            url: process.env.REACT_APP_API_URL,
            method: 'post',
            data: {
                query: `{coordinate(placeName: "${option}"){latitude longitude}}`
            }
        })
        .then(result => {
            dispatch(latLongFetchSuccess(result.data.data.coordinate))
        })
        .catch(error => {
            dispatch(latLongFetchFail(error))
        })
    };
};

