
import { test, expect, request } from '@playwright/test';

const TOKEN = '35ef4c81cbfe403c28ba5eb09f5709119228540d139d8bf2e03675d509845713';
const BASE_URL='https://gorest.co.in/public/v2/users';

//common headres
const headers = {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type' : 'application/json',
      'Accept':'application/json'
    };
test('GET - fetch all users', async ({ request }) => {

  const response = await request.get(BASE_URL, {headers});
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});