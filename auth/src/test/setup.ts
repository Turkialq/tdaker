import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "123456";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  // connect mongoose to the fake mongo db
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  // reset all data in fake mongo db
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
