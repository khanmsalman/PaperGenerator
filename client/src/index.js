import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './RTK/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// import { AnimatePresence } from 'framer-motion';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)} >    
    {/* <AnimatePresence> */}
    <BrowserRouter> 
    <App />
    </BrowserRouter>  
    {/* </AnimatePresence> */}
    </PersistGate>
  </Provider>
  </React.StrictMode>
);
