import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

export const setupMiddleware = (app) => {
  app.use(helmet());
  app.use(cors());
  app.use(morgan('common'));
};
