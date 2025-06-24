import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Use Replit's built-in database environment variables if available
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/hacktheshell";

const client = postgres(DATABASE_URL, {
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });