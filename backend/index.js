import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import 'dotenv/config';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

app.get('/', (req, res) => {
  res.send('louie wuz here! 👽');
});

app.post('/create-preference', async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.unit_price),
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: 'https://louiecodes.github.io',
        failure: 'https://louiecodes.github.io',
        pending: 'https://louiecodes.github.io',
      },
      auto_return: 'approved',
    };
    
    const preference = new Preference(client);
    const response = await preference.create({ body });

    res.json({ id: response.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating preference.' });
  }
});

app.listen(port, () => {
  console.log(`🛸 App listening on port http://127.0.0.1:${port}`);
});
