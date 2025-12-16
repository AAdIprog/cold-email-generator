import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

import authRoutes from './routes/auth.routes';
import emailRoutes from './routes/email.routes';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

app.get('/', (req, res) => {
    res.send('Cold Email Platform API is running');
});

// Routes will be added here

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
