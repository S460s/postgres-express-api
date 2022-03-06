import { getProfile } from '../utils/myFetch';

function getData(key) {
  const data = localStorage.getItem(key);
  const objects = JSON.parse(data);
  return objects;
}

function populateStorage(data, key) {
  localStorage.setItem(key, JSON.stringify(data));
}

function checkStorage(key, defaultValue) {
  if (!localStorage.getItem(key)) {
    return defaultValue;
  } else {
    return getData(key);
  }
}

async function injectUser(setUser, user) {
  if (!user.ok) {
    const jwt = checkStorage('jwt', {});
    if (jwt.ok) {
      const user = await getProfile(jwt.token);
      console.log(user);
      setUser(user);
    }
  }
}

export { populateStorage, checkStorage, injectUser };
