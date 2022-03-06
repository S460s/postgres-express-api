const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

const userRoute = require('./routes/user');
const { sync } = require('./db');

require('./modules/auth/passport');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/', (req, res) => {
  res.json({ msg: 'Docker is awasome!' });
});

app.use('/api/users', userRoute);

app.listen(PORT, async () => {
  console.log(`listening for requests on port ${PORT}`);

  // await sync(true, false);
});
