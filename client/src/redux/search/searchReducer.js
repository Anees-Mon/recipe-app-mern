import { UPDATE_SEARCH_INPUT } from "./searchTypes"
const initialState = {
    searchInput: ''
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_INPUT:
            return {
                ...state,
                searchInput: action.payload
            }
        default:
            return state
    }
}

export default searchReducer