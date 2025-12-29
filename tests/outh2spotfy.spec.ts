import{test,expect} from '@playwright/test'
const CLIENT_ID = 'cac5af7c8ebb4c90ae07f9e6364f9fb2';
const CLIENT_SECRET = '612f16c85cbf40cda2d5d50a45805a78';
let accesstoken : string ;
test.beforeEach(async({request}) => {

    const response = await request.post('https://accounts.spotify.com/api/token',{
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form:{
            grant_type : 'client_credentials',
            client_id : CLIENT_ID,
            client_secret : CLIENT_SECRET },

        });
        expect(response.status()).toBe(200);
        const dataResponse= await response.json();
        console.log('Token API response is : '+dataResponse );
        accesstoken=dataResponse.access_token;
        console.log('TOKEN ============>'+accesstoken);
    });
  test('GET-Album', async({request})=> {
    const response =await request.get('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy',{
            headers: {
                Authorization: `Bearer ${accesstoken}`,
            }
  });
  expect(response.status()).toBe(200);
  const data =await response.json();
  console.log("The response is : "+JSON.stringify(data,null,2));
  console.log('Status:', response.status());
  console.log('Headers:', response.headers());
});

