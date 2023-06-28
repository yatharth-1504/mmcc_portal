// store.ts
import { createStore } from 'redux';
import rootReducer from './reducers'; // assuming you have your root reducer defined

const store = createStore(rootReducer);

export default store;
