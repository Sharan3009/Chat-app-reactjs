import { createStore, combineReducers, applyMiddleware } from 'redux';
import credentialsForm from './reducers/credentials-form.reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    credentialsForm
})
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
    );
export default store;