import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    placeList: [],
    error: null
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

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.PLACE_FETCH_START: return placeFetchStart(state, action)
        case actionTypes.PLACE_FETCH_SUCCESS: return placeFetchSuccess(state, action)
        case actionTypes.PLACE_FETCH_FAIL: return placeFetchFail(state, action)
        default:
            return state
    }
}

export default reducer