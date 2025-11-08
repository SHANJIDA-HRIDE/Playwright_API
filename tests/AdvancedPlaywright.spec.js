// tests/gorest.spec.js
import { test, expect } from '../utils/apiRequest.js'; // ✅ use wrapped test
import * as dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

if (!TOKEN) throw new Error('❌ TOKEN is missing. Please add it to your .env file.');

const authHeaders = {
  Authorization: `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

test.describe('GoRest API CRUD Tests (Auto Allure Attachment)', () => {
  let createdUserId;
  let createdUserEmail;

  test.beforeAll(async ({ apiRequest }) => {
    const timestamp = Date.now();
    const newUser = {
      name: 'Sanjida QA',
      gender: 'female',
      email: `sqa_${timestamp}@example.com`,
      status: 'active',
    };

    const res = await apiRequest.post(`${BASE_URL}/users`, { headers: authHeaders, data: newUser });
    expect(res.status()).toBe(201);
    const body = await res.json();
    createdUserId = body.id;
    createdUserEmail = body.email;
  });

  test.afterAll(async ({ apiRequest }) => {
    if (createdUserId) {
      await apiRequest.delete(`${BASE_URL}/users/${createdUserId}`, { headers: authHeaders });
    }
  });

  test('GET all users', async ({ apiRequest }) => {
    const res = await apiRequest.get(`${BASE_URL}/users`, { headers: authHeaders });
    const users = await res.json();
    expect(res.status()).toBe(200);
    expect(Array.isArray(users)).toBe(true);
  });

  test('GET user by ID', async ({ apiRequest }) => {
    const res = await apiRequest.get(`${BASE_URL}/users/${createdUserId}`, { headers: authHeaders });
    const user = await res.json();
    expect(res.status()).toBe(200);
    expect(user.id).toBe(createdUserId);
  });

  test('PUT update user', async ({ apiRequest }) => {
    const updateData = { name: 'Sanjida QA Updated' };
    const res = await apiRequest.put(`${BASE_URL}/users/${createdUserId}`, { headers: authHeaders, data: updateData });
    const updated = await res.json();
    expect(res.status()).toBe(200);
    expect(updated.name).toBe(updateData.name);
  });

  test('POST create unique user', async ({ apiRequest }) => {
    const newUser = {
      name: 'Unique QA',
      gender: 'male',
      email: `unique_${Date.now()}@example.com`,
      status: 'active',
    };
    const res = await apiRequest.post(`${BASE_URL}/users`, { headers: authHeaders, data: newUser });
    expect(res.status()).toBe(201);
  });

  test('GET users with invalid token', async ({ apiRequest }) => {
    const res = await apiRequest.get(`${BASE_URL}/users`, { headers: { Authorization: 'Bearer INVALID' } });
    expect(res.status()).toBe(401);
  });
});
