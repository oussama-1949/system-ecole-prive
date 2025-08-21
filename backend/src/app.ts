import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import studentRoutes from './routes/studentRoutes';
import paymentRoutes from './routes/paymentRoutes';
import classRoutes from './routes/classRoutes'


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', studentRoutes , paymentRoutes , classRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Backend OK ✅' });
});

export default app;
