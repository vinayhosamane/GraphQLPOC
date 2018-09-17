const express = require('express');
const graphQLHTTP = require('express-graphql');

import schema from './schema';


const app = express();

app.use('/graphql',graphQLHTTP({
    schema,
    graphiql:true,
}))

app.listen(5000);
console.log("Listning on port 5000 ...");