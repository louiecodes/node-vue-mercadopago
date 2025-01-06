import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('louie wuz here! 👽');
});

app.listen(port, () => {
  console.log(`🛸 App listening on port http://127.0.0.1:${port}`);
});
