/* eslint-disable arrow-body-style */
import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from '../../../custom/contoh';

const getListBonusPeriod = async () => {
  // eslint-disable-next-line no-return-await
  return await Axios.get(`${baseUrlApi}/api/v2/listShowBnsPeriod`)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) {
        return setJsonResponse(data);
      }
      return setJsonResponse(data);
    });
};

export default getListBonusPeriod;
