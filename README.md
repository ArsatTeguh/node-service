<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h3 align="center">DOCUMENTASI API NEST</h3>
  <P align="center">Nest - Typescript - MySql - Prisma</P>

## Description

Have some fitur Authentication/Authorization :

<input type="checkbox" >
<label for="vehicle1"> Register </label><br>
<input type="checkbox" >
<label for="vehicle1"> Login </label><br>
<input type="checkbox" >
<label for="vehicle1"> Forgot password </label><br>

<br/>

Have some fitur tables :

<input type="checkbox" checked>
<label for="vehicle1"> [Manual] Create product</label><br>

<input type="checkbox" checked>
<label for="vehicle1"> [Manual] Put product</label><br>

<input type="checkbox" checked>
<label for="vehicle1"> [Manual] Delete product</label><br>

<input type="checkbox" checked>
<label for="vehicle1"> Search by name, categorys, price, populer</label><br>

<input type="checkbox" checked>
<label for="vehicle1"> Pagination</label><br>

<input type="checkbox" checked>
<label for="vehicle1"> [Bulk] Create products via excel</label><br>

<input type="checkbox" >
<label for="vehicle1"> [Bulk] Put products</label><br>

<input type="checkbox" checked>
<label for="vehicle1"> [Bulk] Delete products</label><br>

## Running the app

```bash
# watch mode
$ npm run start:dev
```

# Products API specs

## Get Products

Endpoint : GET /api/barang

Response Body :

    [
        {
            id: 1,
            thumbnail:http:localhost:8000/..
            name: 'kulkas',
            price: 500000,
            variant: [{color:'merah',image:http:localhost:8000/..}],
            stock:100,
            kategory:'elektronik'
        },
        {
            id: 2,
            thumbnail:http:localhost:8000/..
            name: 'mesin cuci',
            price: 500000,
            variant: [{color:'merah',image:http:localhost:8000/..}],
            stock:100,
            kategory:'elektronik'
        }
    ]

## Get Byid Product

Endpoint : GET /api/barang/1

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
