import { createStore } from 'zustand';

const useCartStore = createStore((set) => ({
  items: [],
  totalHarga: 0,
  totalBv: 0,
  totalWeight: 0.0,
  pricecode: '12W4',
  addToCart: (product) => {
    const { id, qty, price_cw, price_ce, bv, weight } = product;
    const checkIfProductExist = state.items.find((item) => item.id === id);
    if (checkIfProductExist) return false;
    set((state) => ({
      items: [...state.items, product],
      totalHarga:
        pricecode === '12W4'
          ? state.totalPrice + qty * price_cw
          : state.totalPrice + qty * price_ce,
      totalBV:
        pricecode === '12W4'
          ? state.totalBv + qty * bv
          : state.totalBv + qty * bv,
      totalWeight: state.totalWeight + qty * weight,
    }));
    return true;
  },
  clearCart: () => {
    set(() => ({
      items: [],
      totalHarga: 0,
      totalBv: 0,
      totalWeight: 0.0,
      pricecode: '12W4',
    }));
  },
}));

export default useCartStore;
