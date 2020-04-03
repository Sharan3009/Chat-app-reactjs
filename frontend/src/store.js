import { createStore, combineReducers, applyMiddleware } from 'redux';
import credentialsForm from './reducers/credentials-form.reducer';
import sideComponent from './reducers/side-component.reducer';
import mainComponent from './reducers/main-component.reducer';
import homeComponent from './reducers/home-component.reducer';
import socketReducer from './reducers/socket.reducer';
import appNavbar from './reducers/app-navbar.reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import SocketClient from './socket';
import socketMiddleware from './middlewares/socket.middleware';

const socketClient = new SocketClient();
const middlewares = [thunk,socketMiddleware(socketClient)]
const rootReducer = combineReducers({
    form: formReducer,
    credentialsForm,
    homeComponent,
    sideComponent,
    mainComponent,
    appNavbar,
    socketReducer
})
const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
    );
export default store;