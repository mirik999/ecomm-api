# Bootstrap
This project was created and maintained by [Mirik999](https://github.com/mirik999)  
Package manager (preferable to use ```yarn```)

```yarn``` installation packages  
```yarn start:dev``` start development

#### Export keys from (src/config/personal.data.ts)
```bash
 export const JWT_SECRET_KEY = '';
 export const DATABASE_NAME = '';
```

Project also required to run [MongoDB](https://www.mongodb.com/)
and [Redis](https://redis.io/)

## General Information
API design: [GraphQL](https://www.apollographql.com/docs/apollo-server/)


## Folder structure
```angular2html
|-src  
|--common ( contains reusable types )
|----request ( for incoming request data )  
|----response ( for response data )  
|--routes ( all endpoints )
|----example ( endpoint )
|------request ( for incoming request data )
|------response ( for response data )
|------example.module.ts ( module for this endpoint )
|------example.resolver.ts ( "controller", "routes" )
|------example.schema.ts ( Database (MongoDB) schema )
|------example.gateway.ts ( websockets )
|------example.service.ts ( business logic )
|--utils ( contains all third party helpers )
|--app.module.ts ( entry module )
|--main.ts ( entry file )
|-.prettierrc ( for single coding rule / must have )
```

This project was bootstrapped with [NestJS](https://nestjs.com/)
