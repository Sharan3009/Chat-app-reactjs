import { createStore, combineReducers } from 'redux';
import credentialsForm from './reducers/credentials-form';
const mainReducer = combineReducers({
    credentialsForm
})
const store = createStore(mainReducer);
export default store;