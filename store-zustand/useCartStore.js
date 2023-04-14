import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      totalHarga: 0,
      totalBv: 0,
      totalWeight: 0.0,
      pricecode: '12W4',
      customerType: '0',

      //pricecode berubah, harga juga mengikuti
      setPriceCode: (newPriceCode) => {
        const { items, customerType, calculateTotalHarga } = get();
        const { totalHarga, totalBv, totalWeight } = calculateTotalHarga(
          items,
          newPriceCode,
          customerType
        );
        set({ pricecode: newPriceCode, totalHarga, totalBv, totalWeight });
      },

      setCustomerType: (newCustomerType) => {
        const { items, customerType, calculateTotalHarga } = get();
        const { totalHarga, totalBv, totalWeight } = calculateTotalHarga(
          items,
          newPriceCode,
          customerType
        );
        set({
          customerType: newCustomerType,
          totalHarga,
          totalBv,
          totalWeight,
        });
      },

      setItems: (newItems) => set({ items: newItems }),
      setTotalHarga: (newTotalHarga) => set({ totalHarga: newTotalHarga }),
      setTotalBv: (newTotalBv) => set({ totalBv: newTotalBv }),
      setTotalWeight: (newTotalWeight) => set({ totalWeight: newTotalWeight }),

      addToCart: (product, qty) => {
        qty = parseInt(qty);
        const { prdcd } = product;
        const existingItemIndex = get().items.findIndex(
          (item) => item.prdcd === prdcd
        );
        if (existingItemIndex >= 0) {
          const existingItem = get().items[existingItemIndex];
          const updatedQty = existingItem.qty + qty;
          if (updatedQty === 0) {
            const newItems = [...get().items];
            newItems.splice(existingItemIndex, 1);
            set((state) => ({
              items: newItems,
              ...get().calculateTotalHarga(
                newItems,
                state.pricecode,
                state.customerType
              ),
            }));
          } else {
            const updatedItem = {
              ...existingItem,
              qty: updatedQty,
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
          }
        } else if (qty > 0) {
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

      updateQtyItem: (prdcd, newQty) => {
        newQty = parseInt(newQty);
        const existingItemIndex = get().items.findIndex(
          (item) => item.prdcd === prdcd
        );
        if (existingItemIndex >= 0) {
          const existingItem = get().items[existingItemIndex];
          if (newQty <= 0) {
            const newItems = [...get().items];
            newItems.splice(existingItemIndex, 1);
            set((state) => ({
              items: newItems,
              ...get().calculateTotalHarga(
                newItems,
                state.pricecode,
                state.customerType
              ),
            }));
          } else {
            const updatedItem = {
              ...existingItem,
              qty: newQty,
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
          }
        }
      },

      clearCart: () => {
        set({
          items: [],
          totalHarga: 0,
          totalBv: 0,
          totalWeight: 0.0,
        });
      },

      calculateTotalHarga: (items, pricecode, customerType) => {
        let totalHarga = 0;
        let totalBv = 0;
        let totalWeight = 0.0;
        items.forEach((item) => {
          if (pricecode === '12W4' && customerType === '0') {
            totalHarga += item.qty * item.priceWestDist;
          } else if (pricecode === '12W4' && customerType === '1') {
            totalHarga += item.qty * item.priceWestCust;
          } else if (pricecode === '12E4' && customerType === '0') {
            totalHarga += item.qty * item.priceEastDist;
          } else {
            totalHarga += item.qty * item.priceEastCust;
          }
          totalBv += item.qty * item.bv;
          totalWeight += item.qty * item.weight;
        });
        return { totalHarga, totalBv, totalWeight };
      },
    }),
    {
      name: 'cart-store',
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
