import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from '../../../custom/contoh';

const getdistrictStk = async (param) => {
  const result = await Axios({
    url: `${baseUrlApi}/api/v2/getdistrictStk`,
    method: 'POST',
    data: {
      latdest: param.lat,
      longdest: param.long,
    },
  }).then((res) => {
    const { status, data } = res;
    // console.log({status, data});
    if (status === 200) return setJsonResponse(data);
    return null;
  }).catch((error) => {
    console.log('masuk catch error', error);
  });
  return result;
};
export default getdistrictStk;
