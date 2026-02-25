import { neon } from '@neondatabase/serverless';

// Ensure the connection string is available
if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set. Database connections will fail.');
}

// Create a generic neon instance for executing queries with a structurally valid fallback URL for build time
export const sql = neon(process.env.DATABASE_URL || 'postgresql://user:password@host.tld/dbname');
