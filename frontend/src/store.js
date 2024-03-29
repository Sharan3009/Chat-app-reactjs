import { createStore, combineReducers, applyMiddleware } from 'redux';
import credentialsForm from './reducers/credentials-form.reducer';
import sideComponent from './reducers/side-component.reducer';
import mainComponent from './reducers/main-component.reducer';
import homeComponent from './reducers/home-component.reducer';
import socketReducer from './reducers/socket.reducer';
import appNavbar from './reducers/app-navbar.reducer';
import globalRooms from './reducers/global-rooms.reducer';
import chatRoom from './reducers/chat-room.reducer';
import roomNameInput from './reducers/room-name-input.reducer';
import chatInputBox from './reducers/chat-input-box.reducer';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import SocketClient from './socket';
import socketMiddleware from './middlewares/socket.middleware';

const socketClient = new SocketClient();
const middlewares = [thunk,socketMiddleware(socketClient)]
const rootReducer = combineReducers({
    form,
    credentialsForm,
    homeComponent,
    sideComponent,
    mainComponent,
    appNavbar,
    socketReducer,
    globalRooms,
    chatRoom,
    roomNameInput,
    chatInputBox
})
const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
    );
export default store;