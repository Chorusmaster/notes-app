import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export const client = new MongoClient(process.env.MONGO_URI!);

const db = client.db("notes");

export const usersCollection = db.collection("users");
export const notesCollection = db.collection("notes");

await usersCollection.createIndex(
  { login: 1 },
  { unique: true }
);