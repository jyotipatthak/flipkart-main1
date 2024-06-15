import { ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART, LOGIN, LOGOUT, CLEAR_CART,ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, ADD_TO_BOOKMARK,REMOVE_FROM_BOOKMARK} from './types';

export const login = (token) => (dispatch) => {
  console.log(token);
  dispatch({ type: LOGIN, payload: token });
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const updateItemQuantityInCart = (productId, quantity) => (dispatch) => {
  dispatch({ type: UPDATE_CART, payload: { productId, quantity } });
};

export const addItemToCart = (product) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: { product } });
};

export const removeItemFromCart = (productId) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CLEAR_CART });
};

export const addToWishlist = (product) => (dispatch) => {
  dispatch({ type: ADD_TO_WISHLIST, payload: { product } });
};

export const removeFromWishlist = (productId) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: { productId } });}

  export const addToBookmark = (product) => (dispatch) => {
    dispatch({ type: ADD_TO_BOOKMARK, payload: { product } });
  };
  
  export const removeFromBookmark = (productId) => (dispatch) => {
    dispatch({ type: REMOVE_FROM_BOOKMARK, payload: { productId } });
  };

