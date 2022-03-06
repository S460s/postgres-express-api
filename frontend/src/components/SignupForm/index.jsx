import {
  Container,
  Button,
  Paper,
  Typography,
  TextField,
  Grid,
} from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useForm, Controller } from 'react-hook-form';

import CONST from '../../const';

function SignupForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', email: '', password: '', role: '' },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch(`${CONST.baseUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      console.log(json);
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
