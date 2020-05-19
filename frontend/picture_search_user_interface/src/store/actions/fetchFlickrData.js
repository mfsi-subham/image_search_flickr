import * as actionTypes from './actionTypes'
import axios from 'axios'

export const fetchFlickrDataStart = () => {
    return{
        type: actionTypes.FETCH_FLICKR_DATA_START
    };
};


export const fetchFlickrDataSuccess = (photoList) => {
    return{
        type: actionTypes.FETCH_FLICKR_DATA_SUCCESS,
        photoList: photoList
    };
};

export const fetchFlickrDataFail = (error) => {
    return{
        type: actionTypes.FETCH_FLICKR_DATA_FAIL,
        error: error
    };
};

export const fetchFlickrData = () => {
    
    return dispatch => {
        dispatch(fetchFlickrDataStart())

        let baseUrl = 'https://www.flickr.com/services/rest/'
        let method = 'flickr.photos.search'
        let api_key = process.env.REACT_APP_FLICKR_API_KEY
        console.log(process.env);
        
        let accuracy = '11'
        let lat =  '-27.46'
        let lon = '153.02'
        let perPage = '3'
        let page = '1'
        let format = 'json'
        let url = baseUrl+'?method='+method+'&api_key='+api_key+'&accuracy='+accuracy+'&lat='+lat+'&lon='+lon+'&per_page='+perPage+'&page='+page+'&format='+format
        
        axios.get(url)
        .then(result => {
            console.log(result.data);
            dispatch(fetchFlickrDataSuccess(result))
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchFlickrDataFail(error))
        })
    };
};


