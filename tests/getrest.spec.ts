import { test, expect, request } from '@playwright/test';

const TOKEN = 'a5409f7c365906597bdc6277a52749a244e3c4dce7d97141bf65b0cf72329105';


//creating new user
// test('GET - fetch all users', async ({ request }) => {

//   const response = await request.get('https://gorest.co.in/public/v2/users', {
//     headers: {
//       Authorization: `Bearer ${TOKEN}`
//     }
//   });

//   expect(response.status()).toBe(200);

//   const data = await response.json();
//   console.log(data);
// });

//Get single User Details
test('GET - fetch all users', async ({ request }) => {

  const response = await request.get('https://gorest.co.in/public/v2/users/8229210', {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });

  expect(response.status()).toBe(200);

  const data = await response.json();
  console.log(data);
});


test('POST_create a user',async({request}) => {

const requestBody = {
 
        name:'PW Test User',
        email :`pwtest${Date.now()}@mail.com`,
        gender  :'female',
        status :'active'

    };
const response = await request.post('https://gorest.co.in/public/v2/users/' ,{
    headers : {
        Authorization : `Bearer ${TOKEN}`,
    },

    data:requestBody
});
expect( response.status()).toBe(201);
const data = await response.json();
console.log(data);


});