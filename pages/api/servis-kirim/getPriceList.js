/* eslint-disable no-plusplus */
import Axios from 'axios';

const token =
  'cb386747fad6955d445ca1ad9e091d1e258e563d9516863e01e710c0f37d0ec8a70fa45ae8d51bf43d83fa6151abcf4c5267b62ltcCLRBuFJccH9U8ar0eaJbbVpli8BuyXBJq280w';

const getPriceList = async (param) => {
  let loccd = 'BID06';
  if (param.whcd !== 'WH001') {
    loccd = param.whcd;
  }

  const paramBody = {
    token,
    whcd: param.whcd,
    loccd,
    id_member: param.id_member,
    jenis_alamat: param.addressType,
    berat: String(param.berat),
    harga_barang: String(param.harga),
    asuransi: '0',
  };

  const result = await Axios({
    // url: `${baseUrlApi}/api/v2/getPriceListOngkir`,
    url: 'https://service-kurir.k-link.dev/api/feecourierOP2',
    method: 'POST',
    data: paramBody,
  })
    .then((res) => {
      const { status, data } = res;
      if (status !== 200) {
        // return setJsonResponse(data);
        const responseError = {
          errCode: '005',
          data: null,
          message: '',
        };
        return responseError;
      }

      const { data: isidata } = data;
      const { response_kurir: responseKurir } = isidata;
      console.log({ responseKurir });

      const availableCourier = responseKurir.filter((e) => e.status === true);

      const listCod = [];
      const listNonCod = [];
      for (let i = 0; i < availableCourier.length; i++) {
        const { package: paket, courier, logo } = availableCourier[i];
        let arrnew = {
          courier,
          logo,
        };

        if (paket.length > 0) {
          for (let j = 0; j < paket.length; j++) {
            if (paket[j].code === 'COD') {
              arrnew = {
                ...arrnew,
                is_cod: '1',
                code: paket[j].code,
                service: paket[j].service,
                fee: paket[j].fee,
              };
              listCod.push(arrnew);
            } else {
              arrnew = {
                ...arrnew,
                is_cod: '0',
                code: paket[j].code,
                service: paket[j].service,
                fee: paket[j].fee,
              };
              listNonCod.push(arrnew);
            }
          }
        }
      }

      /* console.log({ listCod, listNonCod }); */
      const hasil = {
        errCode: '000',
        data: {
          listCod,
          listNonCod,
        },
        message: '',
      };
      return hasil;
    })
    .catch((error) => {
      console.log('masuk catch error', error);
    });

  return result;
};

export default getPriceList;
