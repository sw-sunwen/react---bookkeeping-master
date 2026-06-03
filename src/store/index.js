import { configureStore } from '@reduxjs/toolkit';
import billReducer from './modules/bill-store';
const store = configureStore({
  reducer: {
    bill: billReducer
  }
})
export default store;