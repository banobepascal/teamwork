import helmet from 'helmet';
import compression from 'compression';

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};
