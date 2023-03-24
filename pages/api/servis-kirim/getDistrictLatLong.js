import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from '../../../custom/contoh';

const getDistrictLatLong = async (param) => {
  const result = await Axios({
    url: `${baseUrlApi}/api/v2/getDistrictLatLong`,
    method: 'POST',
    data: {
      areaLokasi: param,
    },
  }).then((res) => {
    const { status, data } = res;
    if (status === 200) return setJsonResponse(data);
    return null;
  }).catch((error) => {
    console.log('masuk catch error', error);
  });
  return result;
};

export default getDistrictLatLong;
