import Axios from 'axios';
import { baseUrlApi, setJsonResponse, falseResponse } from '../../../custom/contoh';

const getListAddress = async (memberId) => {
  const resAwait = await Axios.get(`${baseUrlApi}/api/v2/getListAddressMember/${memberId}`)
    .then((res) => {
      const { data, status } = res;
      if (status === 200) return setJsonResponse(data);
      return setJsonResponse(falseResponse);
    });
  return resAwait;
};
export default getListAddress;
