import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import modeReducer from './Slices/ModeSlice'
import paperReducer from './Slices/PaperSlice';
import authReducer from './Slices/AuthSlice'
import storage from 'redux-persist/lib/storage';


const persistConfig = { key:"root", storage, version:"1"};

const persistedReducer = persistReducer(persistConfig, modeReducer)

const store = configureStore({
    reducer:{
        mode:persistedReducer,
        papers:paperReducer,
        users:authReducer
    },
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),


})

export default store