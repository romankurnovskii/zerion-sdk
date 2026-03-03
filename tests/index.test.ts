import {describe, it, expect} from 'vitest';
import {ZerionAPI, createZerionClient} from '../src';

describe('Zerion SDK', () => {
  it('should create a ZerionAPI instance with api key', () => {
    const client = new ZerionAPI({apiKey: 'test-api-key'});
    expect(client).toBeDefined();
  });

  it('should create a ZerionAPI instance using factory function', () => {
    const client = createZerionClient({apiKey: 'test-api-key'});
    expect(client).toBeDefined();
  });

  it('should create a ZerionAPI instance with custom base URL', () => {
    const client = new ZerionAPI({
      apiKey: 'test-api-key',
      baseUrl: 'https://custom.api.zerion.io',
    });
    expect(client).toBeDefined();
  });

  it('should create a ZerionAPI instance with custom timeout', () => {
    const client = new ZerionAPI({
      apiKey: 'test-api-key',
      timeout: 5000,
    });
    expect(client).toBeDefined();
  });

  it('should create a ZerionAPI instance with retry options', () => {
    const client = new ZerionAPI({
      apiKey: 'test-api-key',
      retryAttempts: 5,
      retryDelay: 2000,
    });
    expect(client).toBeDefined();
  });
});
