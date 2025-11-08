// utils/apiRequest.js
import { expect, test as base } from '@playwright/test';

// Extend the Playwright test fixture
export const test = base.extend({
  apiRequest: async ({ request }, use, testInfo) => {
    // Wrap the original request object
    const wrappedRequest = {};

    // List of methods we want to wrap
    ['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
      wrappedRequest[method] = async (url, options = {}) => {
        // Attach request body if exists
        if (options.data) {
          await testInfo.attach(`[${method.toUpperCase()}] Request: ${url}`, {
            body: JSON.stringify(options.data),
            contentType: 'application/json',
          });
        }

        // Send actual request
        const response = await request[method](url, options);

        // Clone response body safely
        let body;
        try {
          body = await response.json();
        } catch {
          body = await response.text();
        }

        // Attach response body
        await testInfo.attach(`[${method.toUpperCase()}] Response: ${url}`, {
          body: typeof body === 'string' ? body : JSON.stringify(body, null, 2),
          contentType: 'application/json',
        });

        return response;
      };
    });

    await use(wrappedRequest); // pass wrapped request to tests
  },
});
