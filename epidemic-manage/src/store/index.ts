import userReducer from './reducer/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  // 无需持久化黑名单
  // blacklist: ['']
};

const persistUser = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistUser
  },
});

const persistor = persistStore(store); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {
  persistor,
  store
};
