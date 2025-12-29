import { test, expect } from '@playwright/test';

test('GET - fetch all users', async ({ request }) => {
  const response = await request.get('/users', {
    headers: {
      Authorization: `Bearer ${process.env.GOREST_TOKEN}`,
    },
  });

  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data.length);
});
