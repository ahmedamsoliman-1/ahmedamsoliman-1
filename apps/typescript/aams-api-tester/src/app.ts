// import express from 'express';
// import path from 'path';
// import apiTesterRoutes from './routes/apiTesterRoutes';
// import logger from './utils/logger';

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '..', 'public')));

// app.use('/', apiTesterRoutes);

// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   logger.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// export default app;
