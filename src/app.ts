import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import postRoutes from './routes/post';

const app = express();
app.use(json());
app.use('/post', postRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000);