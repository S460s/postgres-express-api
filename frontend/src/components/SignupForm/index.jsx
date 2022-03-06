import {
  Container,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { useContext } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useForm, Controller } from 'react-hook-form';

import { getProfile, signUp } from '../../utils/myFetch';
import { populateStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../App';

function SignupForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', email: '', password: '', role: '' },
  });

  const onSubmit = async (data) => {
    try {
      const res = await signUp(data);
      if (res.ok) {
        populateStorage(res, 'jwt');
        const user = await getProfile(res.token);
        setUser(user);
        navigate('/');
      } else {
        console.log('HANDLE ERROR');
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
          Sign up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center" direction="row">
            <Grid item xs={12}>
              <Controller
                name="username"
                rules={requiredRule}
                control={control}
                render={({ field }) => (
                  <TextField
                    required={true}
                    label="Username"
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                    id="username"
                    variant="standard"
                    {...field}
                  />
                )}
              />
            </Grid>
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
              <FormControl>
                <FormLabel id="role">Role</FormLabel>
                <RadioGroup
                  aria-labelledby="role"
                  defaultValue="student"
                  name="role-radio"
                >
                  <FormControlLabel
                    value="student"
                    {...register('role', { required: true })}
                    control={<Radio />}
                    label="Student"
                  />
                  <FormControlLabel
                    value="teacher"
                    {...register('role', { required: true })}
                    control={<Radio />}
                    label="Teacher"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="outlined" size="large">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupForm;
