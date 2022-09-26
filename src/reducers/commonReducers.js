import { CLEAR_ERROR, GET_CITIES, GET_DISTRICTS, GET_SUB_DISTRICTS, GET_HOUSE_TYPES, CLEAR_DISTRICTS } from "../actions/commonActions";

const initState = {
    error: null,
    cities: [],
    subDistricts: [],
    districts: [],
    houseTypes: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case CLEAR_ERROR: 
            return {
                ...state,
                error: null
            }
        case GET_CITIES: {
            return {
                ...state,
                cities: action.payload
            }
        }
        case GET_SUB_DISTRICTS: 
            return {
                ...state,
                subDistricts: action.payload
            }
        case GET_DISTRICTS: 
            return {
                ...state,
                districts: action.payload
            }
        case GET_HOUSE_TYPES: 
            return {
                ...state,
                houseTypes: action.payload
            }
        case CLEAR_DISTRICTS: 
            return {
                ...state,
                districts: []
            }
    }
    return state;
}
