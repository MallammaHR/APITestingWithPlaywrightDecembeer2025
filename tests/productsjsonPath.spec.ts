import { test, expect } from '@playwright/test';
import { JSONPath } from 'jsonpath-plus';

// Base URL of the API
const BASE_URL = 'https://fakestoreapi.com/products';

test(
  'GET-all the products test',
  { tag: ['@api', '@get', '@products'] },
  async ({ request }) => {

    // Send GET request with proper headers
    const response = await request.get(BASE_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Playwright-API-Test'
}

    });

    // Assert response status
    expect(response.status()).toBe(200);

    // Parse JSON response
    const data = await response.json();

    // Extract product titles
    const titles = JSONPath({ path: '$[*].title', json: data });
    console.log('Product titles:', JSON.stringify(titles, null, 2));

    // Extract product IDs
    const ids = JSONPath({ path: '$[*].id', json: data });
    console.log('Product IDs:', ids);

    // Extract ratings
    const ratings = JSONPath({ path: '$[*].rating', json: data });
    console.log('Product ratings:', JSON.stringify(ratings, null, 2));

    // Extract all jewelery products
    const jeweleryProducts = JSONPath({ path: `$[?(@.category=='jewelery')]`, json: data });
    console.log('Jewelery products:', JSON.stringify(jeweleryProducts, null, 2));

    // Extract titles of jewelery products
    const jeweleryTitles = JSONPath({ path: `$[?(@.category=='jewelery')].title`, json: data });
    console.log('Jewelery product titles:', JSON.stringify(jeweleryTitles, null, 2));
  }
);
