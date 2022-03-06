import { Container, Button, Paper, Typography, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

function SignupForm() {
  // const location = useLocation();
  // const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { username: '', email: '', password: '' },
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  const requiredRule = {
    required: { value: true, message: 'This field is required' },
  };

  return (
    <Container>
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

          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ display: 'block', marginTop: '2rem' }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignupForm;
