import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    placeList: [],
    error: null,
    lat: null,
    long: null
};

const placeFetchStart = (state, action) => {
    return updateObject(state, {error: null})
};

const placeFetchSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        placeList: action.placeList
    })
}

const placeFetchFail = (state, action) => {
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
        case actionTypes.PLACE_FETCH_START: return placeFetchStart(state, action)
        case actionTypes.PLACE_FETCH_SUCCESS: return placeFetchSuccess(state, action)
        case actionTypes.PLACE_FETCH_FAIL: return placeFetchFail(state, action)
        case actionTypes.FETCH_LAT_LONG_DATA_START: return latLongFetchStart(state, action)
        case actionTypes.FETCH_LAT_LONG_DATA_SUCCESS: return latLongFetchSuccess(state, action)
        case actionTypes.FETCH_LAT_LONG_DATA_FAIL: return latLongFetchFail(state, action)
        default:
            return state
    }
}

export default reducer