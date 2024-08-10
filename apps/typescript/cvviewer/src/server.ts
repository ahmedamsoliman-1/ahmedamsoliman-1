import express from 'express';
import path from 'path';
import pdfRoutes from './routes/pdf';

const app = express();
const port = 3000;

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', pdfRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
