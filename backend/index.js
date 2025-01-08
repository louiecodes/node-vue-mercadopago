import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('louie wuz here! 👽');
});

app.listen(port, () => {
  console.log(`🛸 App listening on port http://127.0.0.1:${port}`);
});
