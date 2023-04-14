import { useEffect } from 'react';
import useCartStore from '../store-zustand/useCartStore';
import useMemberInfo from '../store-zustand/useMemberInfo';

function Dion() {
  const { items, totalHarga, totalBv, totalWeight } = useCartStore();
  const { userlogin, idmember, namamember } = useMemberInfo();

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  // kode lainnya
  console.log({ userlogin, idmember, namamember });

  return (
    <div>
      <div>ID : {userlogin}</div>
      <div>nama : {idmember}</div>
      <div>ID : {namamember}</div>
    </div>
  );
}

export default Dion;
