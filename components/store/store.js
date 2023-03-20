import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
});

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);

persistor.subscribe(() => console.log('Persisted state', store.getState()));

export { store, persistor };
