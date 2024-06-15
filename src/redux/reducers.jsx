import { createReducer } from '@reduxjs/toolkit';
import { ADD_TO_CART, REMOVE_FROM_CART, LOGIN, LOGOUT, UPDATE_CART, CLEAR_CART, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, ADD_TO_BOOKMARK, REMOVE_FROM_BOOKMARK } from './types';

const initialState = {
  isAuthenticated: false,
  cart: {},
  wishlist: {},
  bookmark: {},  
  token: null,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LOGIN, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    })
    .addCase(LOGOUT, (state) => {
      state.isAuthenticated = false;
      state.token = null;
    })
    .addCase(ADD_TO_CART, (state, action) => {
     
      let key = action.payload.product.id;
      
      state.cart[`${key}`] = {
        ...action.payload,
        quantity: 1, 
      };
      console.log(state.cart)
    })
    .addCase(UPDATE_CART, (state, action) => {
      let key = action.payload.productId;
      if (action.payload.quantity <= 0) {
        delete state.cart[`${key}`];
      } else {
        state.cart[`${key}`].quantity = action.payload.quantity;
      }
    })
    .addCase(REMOVE_FROM_CART, (state, action) => {
      let key = action.payload.productId;
      delete state.cart[key];
    })
    .addCase(ADD_TO_WISHLIST, (state, action) => {
      let key = action.payload.product.id;
      state.wishlist[`${key}`] = action.payload.product;
    })
    .addCase(REMOVE_FROM_WISHLIST, (state, action) => {
      let key = action.payload.productId;
      delete state.wishlist[key];
    })
    .addCase(ADD_TO_BOOKMARK, (state, action) => {
      let key = action.payload.product.id;
      state.bookmark[`${key}`] = action.payload.product;  // Handle bookmarks separately
    })
    .addCase(REMOVE_FROM_BOOKMARK, (state, action) => {
      let key = action.payload.productId;
      delete state.bookmark[key];  // Handle bookmarks separately
    })
    .addCase(CLEAR_CART, (state) => {
      state.cart = {};
    });
});

export default rootReducer;
