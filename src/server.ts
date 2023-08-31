import { App } from '@/app';
import { agricultorRoute } from '@/routes/agricultor.route';
import { ValidateEnv } from '@utils/validateEnv';
import { clientesRoute } from './routes/clientes.route';
import { cosechasRoute } from './routes/cosechas.routes';
import { camposRoute } from './routes/campos.route';
import { indexRoute } from './routes/index.route';

ValidateEnv();

const app = new App([new indexRoute(), new agricultorRoute(), new clientesRoute(), new cosechasRoute(), new camposRoute()]);

app.listen();
