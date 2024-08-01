import { Hono } from 'hono';
import validate from './routes/validate.route';

const app = new Hono().basePath('/api');

app.route('/validate', validate);

export default app;
