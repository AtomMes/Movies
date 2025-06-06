import app from './app';
import { envConfig } from './config/env';

const port = envConfig.port;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});