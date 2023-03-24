import React, { createContext, useContext, useState, useEffect } from 'react';
import { updateRekapTrans } from '../custom/contoh';

const AppContext = createContext();

const validLogin = null;
const isiCart = {
  data: [],
  totalItem: 0,
  totalHarga: 0,
  totalBv: 0,
  totalWeight: 0,
  memberId: validLogin !== null ? validLogin.userlogin : '',
  memberName: validLogin !== null ? validLogin.loginname : '',
  bonusPeriod: '',
  priceCode: '12W4',
  sentTo: '1',
  areaStockist: '',
  stockistCode: '',
  stockistName: '',
  chooseStk: '',
  isCod: '0',
  addressCode: '',
  addressType: '',
  receiverName: '',
  postcodeLatitute: '',
  postcodeLongitude: '',
  infoPilAlamat: '',
  warehouseCode: '',
  warehouseInfo: '',
  stockistReffCode: '',
  stockistReffInfo: '',
  listStockist: [],
  listAddressMember: [],
  listWarehouse: [],
  listStkReff: [],
  filteredStk: [],
  listKurir: [],
  listCargo: [],
  listPayment: [],
};

export function AppWrapper({ children }) {
  const [login, setLogin] = useState(validLogin);
  const [cart, setCart] = useState(isiCart);
  const [menu, setMenu] = useState([]);
  const [lang, setLang] = useState('in');

  const addToCart = (item) => {
    const { data } = cart;
    const isExist = data.some((el) => el.prdcd === item.prdcd);
    if (isExist) return alert('Produk sudah ada dalam keranjang..');

    const newItem = { ...item, qty: 1 };
    const newArrData = [...data, newItem];
    const { priceCode } = cart;
    const newArr = updateRekapTrans(newArrData, login, priceCode);
    setCart({
      ...cart,
      data: newArrData,
      totalItem: newArr.totalItem,
      totalHarga: newArr.totalHarga,
      totalBv: newArr.totalBv,
      totalWeight: newArr.totalWeight,
    });

    alert(`Produk ${item.prdnm} sudah dimasukkan ke dalam keranjang`);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/menu')
      .then((response) => response.json())
      .then((responsedata) => {
        const { data, errorCode } = responsedata;
        // console.log({responsedata});
        if (errorCode === '0') {
          setMenu(data);
        }
      });

    let getLocalStorage = isiCart;
    let getLoginData = validLogin;

    if (typeof window !== 'undefined') {
      console.log('Tidak ada localstorage');
      // getLocalStorage = JSON.parse();
      getLocalStorage = JSON.parse(localStorage.getItem('cart_content'));
      // console.log({getLocalStorage});
      setCart(getLocalStorage);

      getLoginData = JSON.parse(localStorage.getItem('login'));
      /* console.log({getLoginData}); */

      setLogin(getLoginData);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart_content', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem('login', JSON.stringify(login));
  }, [login]);

  return (
    <AppContext.Provider
      value={{
        login,
        setLogin,
        menu,
        setMenu,
        lang,
        setLang,
        cart,
        setCart,
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
