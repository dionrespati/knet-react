import { useEffect } from 'react';
import useCartStore from '../store-zustand/useCartStore';
import useMemberInfo from '../store-zustand/useMemberInfo';

function Dion() {
  const { items, totalHarga, totalBv, totalWeight } = useCartStore();
  const { userlogin, idmember, namamember } = useMemberInfo();

  useEffect(() => {
    const cartStoreData = JSON.parse(localStorage.getItem('cart-store'));
    if (
      cartStoreData &&
      cartStoreData.items !== undefined &&
      cartStoreData.items.length > 0
    ) {
      setItems(cartStoreData.items);
      setTotalHarga(cartStoreData.totalHarga);
      setTotalBv(cartStoreData.totalBv);
      setTotalWeight(cartStoreData.totalWeight);
    }
  }, []);

  useEffect(() => {
    const memberInfoData = JSON.parse(localStorage.getItem('member-info'));
    if (
      memberInfoData &&
      memberInfoData.items !== undefined &&
      memberInfoData.items.length > 0
    ) {
      set(() => ({
        userlogin: memberInfoData.userlogin,
        idmember: memberInfoData.idmember,
        namamember: memberInfoData.namamember,
        bonusperiod: memberInfoData.bonusperiod,
        tel_hp: memberInfoData.tel_hp,
        email: memberInfoData.email,
      }));
    }
  }, []);

  // kode lainnya
  console.log({ userlogin, idmember, namamember });

  return (
    <div>
      <div>ID : {userlogin}</div>
      <div>ID : {idmember}</div>
      <div>ID : {namamember}</div>
    </div>
  );
}

export default Dion;
