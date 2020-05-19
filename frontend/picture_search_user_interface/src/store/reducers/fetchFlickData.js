import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    pictureList: [],
    error: null
};

const fetchFlickrDataStart = (state, action) => {
    return updateObject(state, {error: null})
};

const fetchFlickrDataSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        photoList: action.photoList
    })
}

const fetchFlickrDataFail = (state, action) => {
    return updateObject(state, {
        error: action.error
    })
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_FLICKR_DATA_START: return fetchFlickrDataStart(state, action)
        case actionTypes.FETCH_FLICKR_DATA_SUCCESS: return fetchFlickrDataSuccess(state, action)
        case actionTypes.FETCH_FLICKR_DATA_FAIL: return fetchFlickrDataFail(state, action)
        default:
            return state
    }
}

export default reducer