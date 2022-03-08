import CONST from '../const';

function postReq(path) {
  return async function (body) {
    try {
      const res = await fetch(`${CONST.baseUrl}/s${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      return { ok: false, error: 'internal error' };
    }
  };
}

const signUp = postReq('login');
const login = postReq('login');

async function getProfile(jwt) {
  const res = await fetch(`${CONST.baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();
  return data;
}

export { signUp, getProfile, login };
