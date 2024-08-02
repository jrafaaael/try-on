import { Hono } from 'hono';
import { cors } from 'hono/cors';
import validate from './routes/validate.route';

const app = new Hono().basePath('/api');

app.use(
	cors({
		origin: '*',
	})
);

app.route('/validate', validate);

export default app;
