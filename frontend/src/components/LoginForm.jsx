import {
  Container,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { useContext, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import { getProfile, login } from '../utils/myFetch';
import { populateStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', email: '', password: '', role: '' },
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      console.log(res);
      if (res.ok) {
        populateStorage(res, 'jwt');
        const user = await getProfile(res.token);
        setUser(user);
        navigate('/');
      } else {
        setError(res.error);
      }
    } catch (err) {
      console.log(err, data);
    }
  };

  const requiredRule = {
    required: { value: true, message: 'This field is required' },
  };

  return (
    <Container maxWidth="md">
      <Paper
        sx={{
          marginTop: '5rem',
          padding: '2rem',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            marginBottom: '2rem',
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center" direction="row">
            <Grid item xs={12}>
              <Controller
                name="email"
                rules={requiredRule}
                control={control}
                render={({ field }) => (
                  <TextField
                    required={true}
                    label="Email"
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                    id="email"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                rules={requiredRule}
                control={control}
                render={({ field }) => (
                  <TextField
                    required={true}
                    label="Password"
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                    id="password"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              {error && (
                <Typography color="error" variant="h6">
                  {error}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="outlined" size="large">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupForm;
