import express from 'express';
import path from 'path';
import apiTesterRoutes from './routes/apiTesterRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Set the views directory
const isDevelopment = process.env.NODE_ENV !== 'production';
const viewsDirectory = isDevelopment ? path.join(__dirname, '../src/views') : path.join(__dirname, './views');
app.set('views', viewsDirectory);
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiTesterRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
