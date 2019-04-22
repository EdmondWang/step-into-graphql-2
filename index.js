import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "4000";

const DATABASE_NAME = "mydb";
const USER_NAME = "edmond";
const PWD = "12345678";
const db = `mongodb://${USER_NAME}:${PWD}@localhost:27017/${DATABASE_NAME}`;

mongoose
    .connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        autos(): Auto
    }
    type Auto {
        make: String
        model: String
    }
`);

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL({
        schema,
        graphiql: true
    })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
