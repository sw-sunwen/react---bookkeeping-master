import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const billSlice = createSlice({
  name: 'bill',
  initialState: {
    billlist: []
  },
  reducers: {
    setBill(state, action) {
      console.log('setBill called with payload:', action.payload);
      state.billlist = action.payload;
    },
    addBillToState(state, action) {
      state.billlist.unshift(action.payload);
    }
  }
})
const getbilllist = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get('http://localhost:3001/transactions');
      console.log('API Response:', data);
      console.log('Data:', data.data);
      dispatch(setBill(data.data));
    } catch (error) {
      console.error('API Error:', error);
    }
  }
}

const addBill = (billData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3001/transactions', billData);
      dispatch(addBillToState(response.data));
      return response.data;
    } catch (error) {
      console.error('Add Bill Error:', error);
      throw error;
    }
  }
}
export { getbilllist, addBill };
export const { setBill, addBillToState } = billSlice.actions;
export default billSlice.reducer;
