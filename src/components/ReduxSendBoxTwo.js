import { createStore, combineReducers, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import promise from 'redux-promise-middleware'

const initialState = {
    data : [],
    isLoading : true
}

const manga = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MANGA':
            state
            break; 
        case 'GET_MANGA_FULFILLED':
            state = {...state, data : action.payload.data}
            break;
        default:
            state
            break;
    }
    return state;
}

const rootReducers = combineReducers({
    manga
})

const middleware = applyMiddleware(promise, logger)

const store = createStore(
    rootReducers, middleware
    
)

export default store;