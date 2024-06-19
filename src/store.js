import { configureStore } from '@reduxjs/toolkit';

import salesReducer from './reducers/salesReducer.js';

const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
 
});

export default store;