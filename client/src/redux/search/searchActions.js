import { UPDATE_SEARCH_INPUT } from './searchTypes'

export const updateSearchInput = value => {
    return {
        type: UPDATE_SEARCH_INPUT,
        payload: value
    }
}