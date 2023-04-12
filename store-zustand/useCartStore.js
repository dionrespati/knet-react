import { createStore } from 'zustand';

const useCartStore = createStore((set) => ({
  items: [],
  totalHarga: 0,
  totalBv: 0,
  totalWeight: 0.0,
  pricecode: '12W4',
  addToCart: (product) => {
    const { qty, price_cw, price_ce, bv, weight } = product;
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
