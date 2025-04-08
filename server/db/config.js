// db/config.js
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  server: process.env.AZURE_SQL_SERVER,         
  database: process.env.AZURE_SQL_DATABASE,     
  port: Number(process.env.AZURE_SQL_PORT) || 1433,
  user: process.env.AZURE_SQL_USER,             
  password: process.env.AZURE_SQL_PASSWORD,     
  options: {
    encrypt: true,      
    enableArithAbort: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

let poolPromise;

export function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(config)
      .then(pool => {
        console.log("Connected to Azure SQL Database!");
        return pool;
      })
      .catch(err => {
        console.error("Azure SQL Database connection error:", err);
        throw err;
      });
  }
  return poolPromise;
}

export default sql;

