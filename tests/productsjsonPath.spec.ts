import{test,expect} from '@playwright/test';
import { request } from 'http';
import {JSONPath} from 'jsonpath-plus';
//const result = JSONPath({path: '...', json});

const BASE_URL ='https://fakestoreapi.com/products';
const headers = {
    'Accept':'application/json',
    'Content-Type':'application/json'
};

test('GET-all the products test',  {
    tag: ['@api', '@get', '@products']
  },async({request})=>{

   const requestGET= await request.get(BASE_URL,{
        headers:{}});
    expect(requestGET.status()).toBe(200);
    const data=await requestGET.json();
    const jsonData=JSON.stringify(data,null,2);
    //console.log('The products response is : '+jsonData);


    //title os the all the products
    const titleOfAllProduct = JSONPath({path: '$[*].title', json:data});
    console.log('The titles os the Product is : '+JSON.stringify(titleOfAllProduct, null, 2));

    //id's of the product
    const idsAlProduct = JSONPath({path:'$[*].id',json:data});
    console.log('The id of all the product is : '+idsAlProduct);//id's are number array

    //ratings and rate
    const rating =JSONPath({path:'$[*].rating',json:data});
    console.log('The ratings of the all the product is : '+JSON.stringify(rating,null,2));

    ///ratings and rate
    const ratingsrate =JSONPath({path:'$[*].rating',json:data});
    console.log('The ratings of the all the product is : '+JSON.stringify(ratingsrate,null,2));

    //category=jewelry
    const category = JSONPath({path:`$[?(@.category=='jewelery')]`,json:data});
    console.log('The category=jewelery products are  : '+JSON.stringify(category,null,2));

     //category=jewelry.title
    const category_title = JSONPath({path:`$[?(@.category=='jewelery')].title`,json:data});
    console.log('The category=jewelery products are  : '+JSON.stringify(category_title,null,2));
});




