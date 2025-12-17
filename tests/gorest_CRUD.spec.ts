import { test, expect, request } from '@playwright/test';

const TOKEN = '4d1a5b3f15cb1b87d9be3412b697c0a3ca30af72bb8ab33ea7591f8e1ae07f8a';
const BASE_URL='https://gorest.co.in/public/v2/users';

//common headres
const headers = {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type' : 'application/json',
      'Accept':'application/json'
    };

    //Get call
test('GET - fetch all users', async ({ request }) => {

  const response = await request.get(BASE_URL, {headers});
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

//post call-for creating a new user
test('POST-creat a user', async({request}) =>{

    const requestBody = {
     name:'PW Test User',
            email :`pwtest${Date.now()}@mail.com`,
            gender  :'female',
            status :'active'
    
        };
    const response = await request.post(BASE_URL ,{headers,
    
        data:requestBody
    });
    expect( response.status()).toBe(201);
    const data = await response.json();
    console.log(data); 
});
//PUT-if we want to  update the whole information about existing user then we go PUT(full)
//PATCH-Only if i want update only the partial value (Patch-Partial)
test('PUT-Upadte a user', async({request}) =>{

    const userID = 8283831;
    const requestBody = {

            status :'Inactive'
        };
    const response = await request.put(`${BASE_URL}/${userID}`,{headers,
    
        data:requestBody
    });
    expect( response.status()).toBe(200);

});

//DELETE -delete a user
test('DELETE-Upadte a user', async({request}) =>{

    const userID = 8283831;
    const response = await request.delete(`${BASE_URL}/${userID}`,{headers

    });
    expect( response.status()).toBe(204);//once if we deleted and again if we are trying to call the GET then it will throw 404 error
});