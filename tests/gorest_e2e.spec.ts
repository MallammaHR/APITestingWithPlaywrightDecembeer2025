import { test, expect, APIResponse } from '@playwright/test';

// Get API token from environment variables
const API_TOKEN = process.env.API_TOKEN;  
// if (!API_TOKEN) {
//     throw new Error("API_TOKEN environment variable is not set");
// };

const BASE_URL = 'https://gorest.co.in/public/v2/users';

const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

function logResponse(title: string, response: APIResponse) {
    console.log(`\n==================== ${title} ====================`);
    console.log("STATUS:", response.status(), response.statusText());
    console.log("HEADERS:", response.headers());
}

test('e2e crud flow test @api', async ({ request }) => {

    console.log('==============================POST-CALL============================================');

    const requestBody = {
        name: 'PW Test User',
        email: `pwtest${Date.now()}@mail.com`,
        gender: 'female',
        status: 'active'
    };

    const responsePOST = await request.post(BASE_URL, { headers, data: requestBody });
    logResponse("POST RESPONSE", responsePOST);

    expect(responsePOST.status()).toBe(201);
    const createdUser = await responsePOST.json();
    console.log("POST Body:", createdUser);

    const userID = createdUser.id;

    console.log('==============================GET-CALL============================================');

    const responseGET = await request.get(`${BASE_URL}/${userID}`, { headers });
    logResponse("GET RESPONSE", responseGET);

    expect(responseGET.status()).toBe(200);
    console.log("GET Body:", await responseGET.json());

    console.log('============================PUT-CALL==============================================');

    const updateBody = {
        name: 'PW Automation Test User',
        status: 'inactive'
    };

    const responsePUT = await request.put(`${BASE_URL}/${userID}`, { headers, data: updateBody });
    logResponse("PUT RESPONSE", responsePUT);

    expect(responsePUT.status()).toBe(200);
    console.log("PUT Body:", await responsePUT.json());

    console.log('============================DELETE-CALL============================================');

    const responseDELETE = await request.delete(`${BASE_URL}/${userID}`, { headers });
    logResponse("DELETE RESPONSE", responseDELETE);

    expect(responseDELETE.status()).toBe(204);

    console.log('============================GET-AFTER-DELETE======================================');

    const responseGETAfterDelete = await request.get(`${BASE_URL}/${userID}`, { headers });
    logResponse("GET AFTER DELETE RESPONSE", responseGETAfterDelete);

    expect(responseGETAfterDelete.status()).toBe(404);
    console.log("GET After Delete Body:", await responseGETAfterDelete.json());
});