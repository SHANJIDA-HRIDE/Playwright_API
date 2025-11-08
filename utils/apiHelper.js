// utils/apiHelper.js

export const authHeader = (token) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const log = (message, data) => {
  if (process.env.DEBUG === 'true') {
    console.log(message, data || '');
  }
};
