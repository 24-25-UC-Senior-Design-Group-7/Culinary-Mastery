// https://learn.microsoft.com/en-us/azure/azure-sql/database/azure-sql-javascript-mssql-quickstart

import express from 'express';
import { 
  passwordConfig as SQLAuthentication, 
  noPasswordConfig as PasswordlessConfig 
} from '../db/config.js';
import { createDatabaseConnection } from '../db/config.js';

const router = express.Router();
router.use(express.json());

const database = await createDatabaseConnection(SQLAuthentication);

router.get('/', async (req, res) => {
  try {
    // Return a list of users
    const users = await database.readAll();
    console.log(`users: ${JSON.stringify(users)}`);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.post('/', async (req, res) => {
  try {
    // Add a user
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.create(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Get the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    if (userId) {
      const result = await database.read(userId);
      console.log(`user: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    const user = req.body;

    if (userId && user) {
      delete user.id;
      console.log(`user: ${JSON.stringify(user)}`);
      const rowsAffected = await database.update(userId, user);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);

    if (!userId) {
      res.status(404);
    } else {
      const rowsAffected = await database.delete(userId);
      res.status(204).json({ rowsAffected });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

export default router;