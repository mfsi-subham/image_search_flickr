import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    photoList: null,
    error: null,
    page: 1,
    lat: null,
    long: null

};

const fetchFlickrDataStart = (state, action) => {
    return updateObject(state, {error: null})
};

const fetchFlickrDataSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        photoList: action.photoList,
        page: action.page,
        lat: action.lat,
        long: action.long,

    })
}

const fetchFlickrDataFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}
//-----fetch lat long 

const latLongFetchStart = (state, action) => {
    return updateObject(state, {error: null})
};

const latLongFetchSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        lat: action.lat,
        long: action.long
    })
}

const latLongFetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}


const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_FLICKR_DATA_START: return fetchFlickrDataStart(state, action)
        case actionTypes.FETCH_FLICKR_DATA_SUCCESS: return fetchFlickrDataSuccess(state, action)
        case actionTypes.FETCH_FLICKR_DATA_FAIL: return fetchFlickrDataFail(state, action)
        case actionTypes.FETCH_LAT_LONG_DATA_START: return latLongFetchStart(state, action)
        case actionTypes.FETCH_LAT_LONG_DATA_SUCCESS: return latLongFetchSuccess(state, action)
        case actionTypes.FETCH_LAT_LONG_DATA_FAIL: return latLongFetchFail(state, action)
        default:
            return state
    }
}

export default reducer