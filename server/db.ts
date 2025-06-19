import * as schema from "@shared/schema";

// Simplified database configuration for migration
let db: any = null;
let pool: any = null;

// Check if we have a real database connection
if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('temp_db')) {
  try {
    const { Pool, neonConfig } = require('@neondatabase/serverless');
    const { drizzle } = require('drizzle-orm/neon-serverless');
    const ws = require("ws");
    
    neonConfig.webSocketConstructor = ws;
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema });
  } catch (error) {
    console.warn('Database connection failed:', error.message);
    db = null;
    pool = null;
  }
} else {
  console.log('No database URL configured, using in-memory storage');
  db = null;
  pool = null;
}

export { db, pool };