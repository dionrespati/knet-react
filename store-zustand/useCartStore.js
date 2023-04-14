import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  totalHarga: 0,
  totalBv: 0,
  totalWeight: 0.0,
  pricecode: '12W4',
  customerType: '0',

  setPriceCode: (newPriceCode) => set({ pricecode: newPriceCode }),
  setCustomerType: (newCustomerType) => set({ customerType: newCustomerType }),

  addToCart: (product, qty) => {
    const { prdcd } = product;
    const existingItemIndex = get().items.findIndex(
      (item) => item.prdcd === prdcd
    );
    if (existingItemIndex >= 0) {
      const existingItem = get().items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        qty: existingItem.qty + qty,
      };
      const newItems = [...get().items];
      newItems[existingItemIndex] = updatedItem;
      set((state) => ({
        items: newItems,
        ...get().calculateTotalHarga(
          newItems,
          state.pricecode,
          state.customerType
        ),
      }));
    } else {
      let newItem = product;
      newItem.qty = qty;
      set((state) => ({
        items: [...state.items, newItem],
        ...get().calculateTotalHarga(
          [...state.items, newItem],
          state.pricecode,
          state.customerType
        ),
      }));
    }
  },

  calculateTotalHarga: (items, pricecode, customerType) => {
    let totalHarga = 0;
    let totalBv = 0;
    let totalWeight = 0.0;
    items.forEach((item) => {
      if (pricecode === '12W4' && customerType === '0') {
        totalHarga += item.qty * item.priceWestDist;
      } else if (pricecode === '12W4' && isCust === '1') {
        totalHarga += item.qty * item.priceWestCust;
      } else if (pricecode === '12E4' && isCust === '0') {
        totalHarga += item.qty * item.priceEastDist;
      } else {
        totalHarga += item.qty * item.priceEastCust;
      }
      totalBv += item.qty * item.bv;
      totalWeight += item.qty * item.weight;
    });
    return { totalHarga, totalBv, totalWeight };
  },
}));

export default useCartStore;
