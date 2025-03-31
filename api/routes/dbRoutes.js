// This file contains the routes for the database operations. Handles all routes for DB operations.

import express from 'express';
import { createDatabaseConnection } from '../../db/config.js';
import { passwordConfig as SQLAuthentication } from '../../db/config.js';

const router = express.Router();
router.use(express.json());

const database = await createDatabaseConnection(SQLAuthentication);

const tables = ['Users', 'Courses', 'Analytics', 'User_Courses', 'Videos', 'Transcripts'];

tables.forEach((table) => {
  // Get all records
  router.get(`/${table.toLowerCase()}`, async (req, res) => {
    try {
      const records = await database.readAll(table);
      res.status(200).json(records);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });

  // Add a new record
  router.post(`/${table.toLowerCase()}`, async (req, res) => {
    try {
      const record = req.body;
      const rowsAffected = await database.create(table, record);
      res.status(201).json({ rowsAffected });
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });

  // Get a record by ID
  router.get(`/${table.toLowerCase()}/:id`, async (req, res) => {
    try {
      const recordId = req.params.id;
      const result = await database.read(table, recordId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });

  // Update a record
  router.put(`/${table.toLowerCase()}/:id`, async (req, res) => {
    try {
      const recordId = req.params.id;
      const record = req.body;
      delete record[`${table.toLowerCase()}_id`];
      const rowsAffected = await database.update(table, recordId, record);
      res.status(200).json({ rowsAffected });
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });

  // Delete a record
  router.delete(`/${table.toLowerCase()}/:id`, async (req, res) => {
    try {
      const recordId = req.params.id;
      const rowsAffected = await database.delete(table, recordId);
      res.status(204).json({ rowsAffected });
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  });
});

export default router;