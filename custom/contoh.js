/* eslint-disable radix */
/* eslint-disable no-plusplus */
const double = (n) => n * 2;
const triple = (n) => n * 3;
const currencyFormat = (n) => parseInt(n).toLocaleString();
const baseUrlApi = 'https://www.k-net.co.id';

const falseResponse = {
  response: 'false',
  arrayData: null,
  message: '',
};

const setJsonResponse = (data) => {
  const { response, arrayData, message } = data;
  let result = {};
  if (response === 'true') {
    result = {
      ...result,
      errCode: '000',
      data: arrayData,
      message,
    };
  } else {
    result = {
      ...result,
      errCode: '001',
      data: null,
      message,
    };
  }

  return result;
};

const dateFormatName = (parameter) => {
  const arrayBulan = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const isi = parameter.split('-');
  const thn = isi[0];
  const bln = parseInt(isi[1]);
  const blnNama = arrayBulan[bln];
  return `${blnNama} ${thn}`;
};

const updateRekapTrans = (cart, login, priceCode) => {
  let totbv = 0;
  let totweight = 0;
  let totharga = 0;
  let totitem = 0;
  for (let i = 0; i < cart.length; i++) {
    totbv += cart[i].qty * cart[i].bv;
    if (login !== null && priceCode === '12W4') {
      totharga += cart[i].qty * cart[i].priceWestDist;
    }

    if (login !== null && priceCode === '12E4') {
      totharga += cart[i].qty * cart[i].priceEastDist;
    }

    if (login === null && priceCode === '12W4') {
      totharga += cart[i].qty * cart[i].priceWestCust;
    }

    if (login === null && priceCode === '12E4') {
      totharga += cart[i].qty * cart[i].priceEastCust;
    }
    totweight += cart[i].qty * cart[i].weight;
    totitem += cart[i].qty;
  }

  const newArrCart = {
    totalItem: totitem,
    totalWeight: parseFloat(totweight.toFixed(2)),
    totalHarga: totharga,
    totalBv: totbv,
  };

  return newArrCart;
};

function capitalizeFirstLetter(string) {
  // let newStr = string.toLowerCase();
  // return newStr.charAt(0).toUpperCase() + string.slice(1);
  return string;
}

function UppercaseFirst(mySentence) {
  const convertLower = mySentence.toLowerCase();
  const finalSentence = convertLower.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  return finalSentence;
}

export {
  double, triple, currencyFormat, baseUrlApi, setJsonResponse,
  dateFormatName, updateRekapTrans, capitalizeFirstLetter,
  UppercaseFirst, falseResponse,
};
