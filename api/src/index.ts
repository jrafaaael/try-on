import { Hono } from 'hono';

const app = new Hono().basePath('/api');

app.get('/', (c) => c.text('Hono!'));

export default app;
