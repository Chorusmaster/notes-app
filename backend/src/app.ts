import express from 'express';
import { client, notesCollection, usersCollection } from './db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import type { RequestHandler } from "express";
import { ObjectId } from 'mongodb';

const app = express();

await client.connect();
console.log("Database connected");

app.get('/', (req, res) => {
  res.send('Backend running');
});

app.post('/register', async (req, res) => {
  const data = req.body
  if (!data.login || !data.password) {
    res.status(422).send('Login and password are required');
    return;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const result = await usersCollection.insertOne({
    login: data.login,
    passwordHash: passwordHash
  });

  const token = jwt.sign(
    { userId: result.insertedId.toString() },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.send("Registration successful");
});

app.post('/login', async (req, res) => {
  const data = req.body
  if (!data.login || !data.password) {
    res.status(422).send('Login and password are required');
    return;
  }

  const result = await usersCollection.findOne({login: data.login});
  if (result === null) {
    res.status(401).send('Unauthorized');
    return;
  }

  const isPasswordValid = await bcrypt.compare(data.password, result.passwordHash);
  if (!isPasswordValid) {
    res.status(401).send('Unauthorized');
    return;
  }

  const token = jwt.sign(
    { userId: result._id.toString() },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.send("Authorization successful");
});

const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof payload === "string" || !payload.userId) {
      res.status(401).send("Unauthorized");
      return;
    }
    req.userId = payload.userId;

    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
};

app.get('/notes', authenticate, async (req, res) => {
  const notes = await notesCollection.find({ userId: req.userId }).toArray();
  res.json(notes);
});

app.post('/notes', authenticate, async (req, res) => {
  const data = req.body

  const requiredFields = ["title", "category", "text", "date"];
  for (const field of requiredFields) {
    if (!data[field]) {
      res.status(422).send(`${field} field is required`);
      return;
    }
  }

  await notesCollection.insertOne({
    userId: req.userId,
    title: data.title,
    category: data.category,
    text: data.text,
    date: data.date
  });

  res.send("Note successfully created");
});

app.put('/notes/:id', authenticate, async (req, res) => {
  if (!req.params.id || typeof req.params.id !== "string" || !ObjectId.isValid(req.params.id)) {
    res.status(422).send('Invalid note id');
    return;
  }

  const data = req.body

  const requiredFields = ["title", "category", "text", "date"];
  for (const field of requiredFields) {
    if (!data[field]) {
      res.status(422).send(`${field} field is required`);
      return;
    }
  }

  const existingNote = await notesCollection.findOne({ _id: new ObjectId(req.params.id) });
  if (!existingNote) {
    res.status(404).send('Note does not exist');
    return;
  }
  if (existingNote.userId !== req.userId) {
    res.status(403).send('Forbidden');
    return;
  }

  await notesCollection.updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        title: data.title,
        category: data.category,
        text: data.text,
        date: data.date
      }
    }
  );

  res.send("Note successfully updated");
});

app.delete('/notes/:id', authenticate, async (req, res) => {
  if (!req.params.id || typeof req.params.id !== "string" || !ObjectId.isValid(req.params.id)) {
    res.status(422).send('Invalid note id');
    return;
  }

  const existingNote = await notesCollection.findOne({ _id: new ObjectId(req.params.id) });

  if (!existingNote) {
    res.status(404).send('Note does not exist');
    return;
  }

  if (existingNote.userId !== req.userId) {
    res.status(403).send('Forbidden');
    return;
  }

  await notesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
  res.send("Note successfully deleted");
});

export default app;