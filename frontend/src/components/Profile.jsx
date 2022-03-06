import { useContext } from 'react';
import { UserContext } from '../App';

function Profile() {
  const { user: userData } = useContext(UserContext);
  return <div>{JSON.stringify(userData.user)}</div>;
}

export default Profile;
