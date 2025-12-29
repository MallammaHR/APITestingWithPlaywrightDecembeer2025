import { test, expect } from '@playwright/test';

const BASE_URL = 'https://gorest.co.in/public/v2/users';

test('GET - fetch all users', async ({ request }) => {
  const response = await request.get(BASE_URL);
  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data);
});
