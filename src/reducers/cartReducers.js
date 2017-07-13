"use strict";

export function cartReducers(state = {cart: []}, action){
    switch(action.type){
        case "ADD_TO_CART":
        var cart =  [...state.cart, ...action.payload]
        return {
          cart: cart,
          totalAmount: totals(cart).amount,
          totalQuantity: totals(cart).totalQty
        }
        break;
        case "UPDATE_CART":
          var cart = [...state.cart];
          const indexToUpdate = cart.findIndex(function (cartItem) {
            return cartItem._id === action._id;
          });
          const updatedCartItem = {
            ...cart[indexToUpdate],
            quantity: cart[indexToUpdate].quantity + action.unit
          }
          const updatedCart = [
              ...cart.slice(0, indexToUpdate),
              updatedCartItem,
              ...cart.slice(indexToUpdate + 1)
            ];
          return {
            cart: updatedCart,
            totalAmount: totals(updatedCart).amount,
            totalQuantity: totals(updatedCart).totalQty
          }
        break;
        case "DELETE_CART_ITEM":
        var cart = [...action.payload];
        return {
          cart: cart,
          totalAmount: totals(cart).amount,
          totalQuantity: totals(cart).totalQty
        }
        break;
    }
    return state;
}

export function totals(cartArr) {
  var sum =  cartArr.map(function(cartItem) {
    return cartItem.quantity * cartItem.price;
  }).reduce(function(a,b){
    return a + b;
  },0);

  var totalQty = cartArr.map(function(cartItem){
    return cartItem.quantity;
  }).reduce(function(a,b){
    return a + b;
  },0);

  return {amount: sum.toFixed(2), totalQty: totalQty}
}