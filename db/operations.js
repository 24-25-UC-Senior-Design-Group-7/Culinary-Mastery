// db/operations.js
import sql from 'mssql';
import { getPool } from './config.js';


/**
 * Creates the Courses table if it doesn't already exist.
 * @returns {Promise<void>}
 */
export async function createCoursesTable() {
  const tableQuery = `
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Courses')
    BEGIN
      CREATE TABLE Courses (
        id UNIQUEIDENTIFIER PRIMARY KEY,
        title NVARCHAR(255),
        description NVARCHAR(MAX),
        videoId NVARCHAR(50),
        transcript NVARCHAR(MAX),
        article NVARCHAR(MAX),
        quiz NVARCHAR(MAX), -- store JSON as text
        culinaryTechnique NVARCHAR(100),
        channelName NVARCHAR(255),
        createdAt DATETIME DEFAULT GETDATE()
      )
    END
  `;
  try {
    const pool = await getPool();
    await pool.request().query(tableQuery);
    console.log("Courses table created or already exists.");
  } catch (error) {
    console.error("Error creating Courses table:", error);
    throw error;
  }
}

// db/operations.js (continued)
export async function insertCourse(course) {
    const { id, title, description, videoId, transcript, article, quiz, culinaryTechnique, channelName } = course;
    
    // Convert quiz object to string if it's an object:
    const quizString = typeof quiz === 'object' ? JSON.stringify(quiz) : quiz;
  
    const insertQuery = `
      INSERT INTO Courses (
        id, title, description, videoId, transcript, article, quiz, culinaryTechnique, channelName, createdAt
      )
      VALUES (
        NEWID(), @title, @description, @videoId, @transcript, @article, @quiz, @culinaryTechnique, @channelName, GETDATE()
      )
    `;
  
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input('title',            sql.NVarChar(255), title || '');
      request.input('description',      sql.NVarChar(sql.MAX), description || '');
      request.input('videoId',          sql.NVarChar(50), videoId || '');
      request.input('transcript',       sql.NVarChar(sql.MAX), transcript || '');
      request.input('article',          sql.NVarChar(sql.MAX), article || '');
      request.input('quiz',            sql.NVarChar(sql.MAX), quizString || '');
      request.input('culinaryTechnique',sql.NVarChar(100), culinaryTechnique || '');
      request.input('channelName',      sql.NVarChar(255), channelName || '');
  
      await request.query(insertQuery);
  
      console.log("Course inserted successfully!");
    } catch (error) {
      console.error("Error inserting course:", error);
      throw error;
    }
  }

  export async function getAllCourses() {
    const query = `
      SELECT id, title, description, videoId, transcript, article, quiz, culinaryTechnique, channelName
      FROM Courses
    `;
  
    try {
      const pool = await getPool();
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      console.error("Error retrieving courses:", error);
      throw error;
    }
  }

  export async function getCourseById(id) {
    const query = `
      SELECT id, title, description, videoId, transcript, article, quiz, culinaryTechnique, channelName
      FROM Courses
      WHERE id = @id
    `;
  
    try {
      const pool = await getPool();
      const request = pool.request();
      request.input('id', sql.UniqueIdentifier, id);
      const result = await request.query(query);
      return result.recordset[0];
    } catch (error) {
      console.error("Error retrieving course by ID:", error);
      throw error;
    }
  }
  
