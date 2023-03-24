import Axios from 'axios';
import { baseUrlApi, setJsonResponse, falseResponse } from '../../../custom/contoh';

const getWarehouse = async (param) => {
  const result = await Axios({
    url: `${baseUrlApi}/api/v2/getWarehouse`,
    method: 'POST',
    data: param,
  }).then((res) => {
    const { status, data } = res;
    // console.log({status, data});
    if (status === 200) return setJsonResponse(data);
    return setJsonResponse(falseResponse);
  }).catch((error) => {
    console.log('masuk catch error', error);
    return setJsonResponse(falseResponse);
  });
  return result;
};
export default getWarehouse;
