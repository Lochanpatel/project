import { describe, it, expect } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { handleDemo } from './demo';

describe('Demo Route Handler', () => {
  it('returns demo response with correct message', () => {
    const req = {} as Request;
    const res = {
      status: function(code: number) {
        this.statusCode = code;
        return this;
      },
      json: function(data: any) {
        this.data = data;
        return this;
      },
    } as any;
    const next = (() => {}) as NextFunction;

    handleDemo(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual({ message: 'Hello from Express server' });
  });

  it('returns correct status code', () => {
    const req = {} as Request;
    const res = {
      status: function(code: number) {
        this.statusCode = code;
        return this;
      },
      json: function() {
        return this;
      },
    } as any;
    const next = (() => {}) as NextFunction;

    handleDemo(req, res, next);

    expect(res.statusCode).toBe(200);
  });
});
