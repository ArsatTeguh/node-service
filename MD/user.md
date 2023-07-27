# USER API

## Register user

Endpoint : POST /user/register

Request Body :

        {
            username: "Admin"
            email: "Admin@gmail.com",
            password: "123admin",
        },

Response Body :

        {
            "username" : "Admin",
            "email"    : "Admin@gmail.com"
        }

## Login user

Endpoint : POST /user/login

Response Body :

        {
            id: 1,
            thumbnail:http:localhost:8000/..
            name: 'kulkas',
            price: 500000,
            variant: [{color:'merah',image:http:localhost:8000/..}],
            stock:100,
            kategory:'elektronik'
        },

## Create Product (Manual)

Endpoint : POST /api/barang/add

body : Aplication/json

Request Body :

        {
            thumbnail:FILE:{..}
            name: 'lemari',
            price: 500000,
            variant: [{color:'merah',image:FILE:{}...}],
            stock:10,
            kategory:'perabot'
        },

Response Body :

         {
            id: 3,
            thumbnail:http:localhost:8000/..
            name: 'lemari',
            price: 500000,
            variant: [{color:'merah',image:http:localhost:8000/..}],
            stock:10,
            kategory:'perabot'
        },

## Add Product (From Excel)

## Put Barang

Endpoint : POST /api/barang/edit/3

body : Aplication/json

Request Body :

        {
            id:3,
            thumbnail:FILE:{..}
            name: 'jendela',
            price: 200000,
            variant: [{color:'merah',image:FILE:{}...}],
            stock:10,
            kategory:'perabot'
        },

Response Body :

         {
            id: 3,
            thumbnail:http:localhost:8000/..
            name: 'jendela',
            price: 200000,
            variant: [{color:'merah',image:http:localhost:8000/..}],
            stock:10,
            kategory:'perabot'
        },

## Delete Barang
