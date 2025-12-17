import{test,expect} from '@playwright/test';
 

//one way-defining the both username and passoword
// test('basic auth test', async({request})=>{

//     const username ='admin';
//     const passowrd= 'admin';

//    const credentials =Buffer.from(`${username}:${passowrd}`).toString('base64')

//     const basicauthGET =await request.get('https://the-internet.herokuapp.com/basic_auth',{
//         headers :{
//             'Authorization':`Basic ${credentials}`
//         }
//     });

//     expect(basicauthGET.status()).toBe(200);
//     const ressponseBody = await basicauthGET.text();
//     console.log('The response body of the basic auth is : '+ressponseBody);


// });

//Without headers and we can pass the httpCredetnials(username and passoword) in playwright.config.ts 
// under use{ httpCrectials :{ username : 'admin',password:'admin'}}
test('Basic-Auth without defining the Credtials ', async({request}) =>{

    const responseGET=await request.get('https://the-internet.herokuapp.com/basic_auth');
    const responsBody =await responseGET.text();
    console.log('The response of the Basic-Auth is : '+responsBody);
});
