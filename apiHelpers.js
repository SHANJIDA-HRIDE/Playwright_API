// apiHelpers.js
import { request as playwrightRequest } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const TOKEN = process.env.TOKEN;

/**
 * Create a reusable API context with optional token override
 */
export async function createAPIContext(token = TOKEN) {
  return await playwrightRequest.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

// =========================
// CRUD Helpers
// =========================

export async function createUser(api, userData) {
  return api.post('/users', { data: userData });
}

export async function updateUser(api, userId, updateData) {
  return api.put(`/users/${userId}`, { data: updateData });
}

export async function getUser(api, userId) {
  return api.get(`/users/${userId}`);
}

export async function getAllUsers(api) {
  return api.get('/users');
}

export async function deleteUser(api, userId) {
  return api.delete(`/users/${userId}`);
}
