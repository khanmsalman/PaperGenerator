import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rtkapi = createApi({
    reducerPath:'genapi',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8000/'
    }),
    endpoints:(builder)=>({
        
    })
})


