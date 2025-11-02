// tests/gorest.spec.js
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = '831176ada32baf356ec0851e41ac2246b4c5d7034a50cbb4d7f174cff43cf29f'; // 🔒 Replace this with your valid GoRest token

test.describe('GoRest API CRUD Tests', () => {
  let createdUserId;

  test.beforeAll(async ({ request }) => {
    // Create user before tests
    const newUser = {
      name: 'Sanjida QA',
      gender: 'female',
      email: `sqa_${Date.now()}@example.com`,
      status: 'active',
    };
    const res = await request.post(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: newUser,
    });
    const body = await res.json();
    createdUserId = body.id;
    console.log('✅ User created in beforeAll:', createdUserId);
  });

  test('GET all users', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(200);
  });

  test('PUT update user', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: { name: 'Sanjida QA Updated' },
    });
    expect(res.status()).toBe(200);
  });

  test('DELETE user', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(204);
  });
});
