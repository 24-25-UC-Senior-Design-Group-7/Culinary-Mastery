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

  /**
   * Creates the Users table if it doesn't already exist.
   * @returns {Promise<void>}
   */
export async function createUserTable() {
  const tableQuery = `
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
      BEGIN
          CREATE TABLE Users (
              id UNIQUEIDENTIFIER PRIMARY KEY,
              username NVARCHAR(255) NOT NULL,
              email NVARCHAR(255) NOT NULL UNIQUE,
              password NVARCHAR(MAX) NOT NULL,
              otp NVARCHAR(6),  
              isVerified BIT DEFAULT 0,  
              createdAt DATETIME DEFAULT GETDATE(),
              updatedAt DATETIME DEFAULT GETDATE()
          )
      END
  `;
  try {
      const pool = await getPool();

      await pool.request().query(tableQuery);
      console.log("Users table created or already exists.");
  } catch (error) {
      console.error("Error creating Users table:", error);
      throw error;
  }
}

  /**
   * Inserts a user into the Users table.
   * @param {Object} user - An object containing the user's information.
   * @param {string} user.username - The username.
   * @param {string} user.email - The email.
   * @param {string} user.password - The password.
   * @param {string} user.otp - The one-time password.
   * @returns {Promise<void>}
   */
export async function insertUser(user) {
  const { username, email, password, otp } = user;
  const insertQuery = `
      INSERT INTO Users (id, username, email, password, otp, createdAt, updatedAt)
      VALUES (NEWID(), @username, @email, @password, @otp, GETDATE(), GETDATE())
  `;

  try {
      const pool = await getPool();
      const request = pool.request();
      request.input('username', sql.NVarChar(255), username);
      request.input('email', sql.NVarChar(255), email);
      request.input('password', sql.NVarChar(sql.MAX), password);
      request.input('otp', sql.NVarChar(6), otp);
      
      await request.query(insertQuery);
      console.log("User inserted successfully!");
  } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
  }
}

  /**
   * Verifies a user's account by setting the isVerified flag to 1
   * @param {string} email - The user's email.
   * @param {string} otp - The one-time password.
   * @returns {Promise<boolean>} - A promise resolving to true if the user was verified successfully, false otherwise.
   */
export async function verifyUser(email, otp) {
  const verifyQuery = `
      UPDATE Users
      SET isVerified = 1, updatedAt = GETDATE()
      WHERE email = @email AND otp = @otp AND isVerified = 0
  `;

  try {
      const pool = await getPool();
      const request = pool.request();
      request.input('email', sql.NVarChar(255), email);
      request.input('otp', sql.NVarChar(6), otp);

      const result = await request.query(verifyQuery);
      if (result.rowsAffected[0] > 0) {
          console.log("User verified successfully!");
          return true;
      } else {
          console.log("User verification failed.");
          return false;
      }
  } catch (error) {
      console.error("Error verifying user:", error);
      throw error;
  }
}



/**
 * Finds a user by their email address.
 * 
 * Queries the Users table to retrieve user details matching the provided email.
 * If a user with the given email exists, returns the user's information; otherwise, returns null.
 * 
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<Object|null>} - A promise that resolves with the user object if found, or null if no user is found.
 * @throws Will throw an error if the query fails.
 */

export async function findUserByEmail(email) {
  try {
      const pool = await getPool();
      const result = await pool.request()
          .input('email', sql.NVarChar(255), email)
          .query('SELECT * FROM Users WHERE email = @email');

      if (result.recordset.length > 0) {
          return result.recordset[0]; // Returning the first user found (should be only one due to unique constraint)
      } else {
          return null;
      }
  } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
  }
}

