import { Container, CssBaseline, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../App';

function Home() {
  const data = useContext(UserContext);

  return (
    <Container>
      <Paper
        sx={{
          marginTop: '5rem',
          padding: '2rem',
        }}
      >
        <Typography component="h1" variant="h3">
          Home
        </Typography>
        <Typography variant="p">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo neque
          possimus, exercitationem earum non magni quasi dolorum ab hic velit
          aperiam minima at, quia maiores enim adipisci officia praesentium
          voluptate.
        </Typography>
      </Paper>
    </Container>
  );
}

export default Home;
