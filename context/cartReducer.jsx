/* export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const CHANGE_QTY_PRODUCT = "CHANGE_QTY_PRODUCT"; */

const initialState = {
  data: [],
  totalItem: 0,
  totalPriceW: 0,
  totalPriceCW: 0,
  totalPriceE: 0,
  totalPriceCE: 0,
  totalBV: 0
};

const addToCart = (state, payload) => {
    const { data } = state;
    const { prdcd } = payload;
    const isExist = data.some(el => el.prdcd === prdcd);
    if(isExist) return {response: false, message: "Produk sudah ada di dalam keranjang"};

    const newItem = {...payload, qty: 1};
    const newArr = [ ...data, newItem ];
    setCart({ ...cart, data: newArr });
    return {response: true, message: "Produk sudah ditambahkan ke dalam keranjang"};
};

const deleteFromCart = (state, payload) => {

};

const changeQty = (state, payload) => {

};


export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case type == "ADD_PRODUCT" :
      return addToCart(state, payload);
    case type == "REMOVE_PRODUCT" :
      return deleteFromCart(state, payload);
    case type == "CHANGE_QTY_PRODUCT" :
      return changeQty(state, payload);
    default :
      return state;
  }
}