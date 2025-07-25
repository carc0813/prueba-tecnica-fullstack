import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { createServer } from 'http';

const swaggerDocument = YAML.load('./docs/swagger.yaml');

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: any, res: any) {
  const server = createServer((req_, res_) => {
    swaggerUi.setup(swaggerDocument)(req_, res_);
  });
  server.emit('request', req, res);
}
