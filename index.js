const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
    buildSchema
} = require('graphql');

const app = express();
const MyGraphQLSchema = buildSchema(`
    type Query {
        auto(id: Int!): Auto
    }
    type Auto {

    }
`);

app.use('/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
}));

app.listen(4000);