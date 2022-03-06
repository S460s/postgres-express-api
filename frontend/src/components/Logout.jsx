import { Container, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { UserContext } from '../App';

function Logout() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem('jwt');
    setUser({});
  }, []);

  return (
    <Container>
      <Typography>Logout successful;.</Typography>
    </Container>
  );
}

export default Logout;
