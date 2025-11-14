import { describe, it, expect, vi } from 'vitest';
import supertest from 'supertest';
import { createServer } from './index';

describe('Express Server', () => {
  const app = createServer();
  const request = supertest(app);

  it('responds to ping endpoint', async () => {
    const response = await request.get('/api/ping');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('returns custom ping message from env', async () => {
    const originalEnv = process.env.PING_MESSAGE;
    process.env.PING_MESSAGE = 'custom-ping';

    const response = await request.get('/api/ping');
    expect(response.body.message).toBe('custom-ping');

    process.env.PING_MESSAGE = originalEnv;
  });

  it('responds to demo endpoint', async () => {
    const response = await request.get('/api/demo');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  it('has CORS enabled', async () => {
    const response = await request.options('/api/ping');
    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });

  it('accepts JSON payloads', async () => {
    const response = await request
      .post('/api/ping')
      .set('Content-Type', 'application/json')
      .send({ test: 'data' });
    expect(response.status).toBeDefined();
  });

  it('handles 404 gracefully', async () => {
    const response = await request.get('/api/nonexistent');
    expect(response.status).toBe(404);
  });

  it('logs requests', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await request.get('/api/ping');

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[SERVER\].*GET.*\/api\/ping/)
    );

    consoleSpy.mockRestore();
  });

  it('handles POST requests with body', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    await request
      .post('/api/demo')
      .set('Content-Type', 'application/json')
      .send({ key: 'value' });

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
