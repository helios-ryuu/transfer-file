import { createServer } from './server.js';

const { server, port } = createServer({
  port: 3000,
  sslKeyPath: './ssl/private-key.pem',
  sslCertPath: './ssl/certificate.pem',
  staticFolder: 'public'
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Transfer đang được host tại https://localhost:${port}`);
});
