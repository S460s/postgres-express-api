import CONST from '../const';

async function signUp(body) {
  const res = await fetch(`${CONST.baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

async function getProfile(jwt) {
  const res = await fetch(`${CONST.baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const data = await res.json();
  return data;
}

export { signUp, getProfile };
