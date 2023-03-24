import Axios from 'axios';
import { baseUrlApi, setJsonResponse } from '../../../custom/contoh';

async function loginAuth(memberId, password) {
  const result = await Axios({
    url: `${baseUrlApi}/api/v2/login`,
    method: 'POST',
    data: {
      idmember: memberId,
      password,
    },
  }).then((res) => {
    const { status, data } = res;
    if (status === 200) return setJsonResponse(data);
    return setJsonResponse();
  }).catch((error) => {
    console.log('masuk catch error', error);
  });
  return result;
}

const logout = () => {
  localStorage.removeItem('login');
};

export { loginAuth, logout };
