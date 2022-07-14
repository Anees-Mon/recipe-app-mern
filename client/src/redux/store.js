import { createStore } from 'redux'
import searchReducer from './search/searchReducer'

const store = createStore(searchReducer)

export default store