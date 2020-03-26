import { createStore, combineReducers, applyMiddleware } from 'redux';
import credentialsForm from './reducers/credentials-form';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    credentialsForm
})
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );
export default store;