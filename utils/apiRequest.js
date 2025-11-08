// utils/apiRequest.js
import { expect, test as base } from '@playwright/test';

// ✅ Export expect too, so test files can import it together
export { expect };

export const test = base.extend({
  apiRequest: async ({ request }, use, testInfo) => {
    const wrappedRequest = {};

    ['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
      wrappedRequest[method] = async (url, options = {}) => {
        // Attach request body if exists
        if (options.data) {
          await testInfo.attach(`[${method.toUpperCase()}] Request: ${url}`, {
            body: JSON.stringify(options.data, null, 2),
            contentType: 'application/json',
          });
        }

        // Perform request
        const response = await request[method](url, options);

        // Attach response body
        let body;
        try {
          body = await response.json();
        } catch {
          body = await response.text();
        }

        await testInfo.attach(`[${method.toUpperCase()}] Response: ${url}`, {
          body: typeof body === 'string' ? body : JSON.stringify(body, null, 2),
          contentType: 'application/json',
        });

        return response;
      };
    });

    await use(wrappedRequest);
  },
});
