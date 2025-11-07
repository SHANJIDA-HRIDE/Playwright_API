// tests/gorest.spec.js
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2';
const TOKEN = 'e0dc82d5bada2fea660d18eeab205aa95191e0089e229d861a769e65911fbea6'; // 🔒 Replace with valid token

test.describe('GoRest API CRUD Tests', () => {
  let createdUserId;
  let createdUserEmail;

  // ✅ Positive setup: create a user before all tests
  test.beforeAll(async ({ request }) => {
    const newUser = {
      name: 'Sanjida QA',
      gender: 'female',
      email: `sqa_${Date.now()}@example.com`,
      status: 'active',
    };
    createdUserEmail = newUser.email;
    const res = await request.post(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: newUser,
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    createdUserId = body.id;
    console.log('✅ User created in beforeAll:', createdUserId);
  });

  // =========================
  // Positive Tests
  // =========================

  test('GET all users', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(200);
    const users = await res.json();
    expect(Array.isArray(users)).toBe(true);
  });

  test('GET user by ID', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(200);
    const user = await res.json();
    expect(user.id).toBe(createdUserId);
  });

  test('PUT update user', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: { name: 'Sanjida QA Updated' },
    });
    expect(res.status()).toBe(200);
    const updatedUser = await res.json();
    expect(updatedUser.name).toBe('Sanjida QA Updated');
  });

  test('DELETE user', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/users/${createdUserId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(204);
  });

  test('POST create user with unique email', async ({ request }) => {
    const newUser = {
      name: 'Unique QA',
      gender: 'male',
      email: `unique_${Date.now()}@example.com`,
      status: 'active',
    };
    const res = await request.post(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: newUser,
    });
    expect(res.status()).toBe(201);
  });

  // =========================
  // Negative Tests
  // =========================

  test('GET users with invalid token', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer INVALID_TOKEN` },
    });
    expect(res.status()).toBe(401);
  });

  test('POST user with missing required fields', async ({ request }) => {
    const invalidUser = { name: 'Missing Fields' }; // missing gender, email, status
    const res = await request.post(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: invalidUser,
    });
    expect(res.status()).toBe(422);
  });

  test('POST user with duplicate email', async ({ request }) => {
    const duplicateUser = {
      name: 'Duplicate Email',
      gender: 'female',
      email: createdUserEmail, // reusing previous email
      status: 'active',
    };
    const res = await request.post(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: duplicateUser,
    });
    expect(res.status()).toBe(422);
  });

  test('PUT user with invalid ID', async ({ request }) => {
    const res = await request.put(`${BASE_URL}/users/999999999`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      data: { name: 'Invalid ID' },
    });
    expect(res.status()).toBe(404);
  });

  test('DELETE user with invalid ID', async ({ request }) => {
    const res = await request.delete(`${BASE_URL}/users/999999999`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(404);
  });

  test('GET user with invalid ID', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/users/999999999`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    expect(res.status()).toBe(404);
  });
});
