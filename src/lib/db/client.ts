import 'server-only';
import { count, eq, ilike } from 'drizzle-orm';
import { products } from './schema';
import { MockDB } from './mock-db';

// Initialize database clients
let neonClient: any;
let drizzleClient: any;

// Try to import real DB clients
try {
  const { neon } = require('@neondatabase/serverless');
  const { drizzle } = require('drizzle-orm/neon-http');
  
  neonClient = neon;
  drizzleClient = drizzle;
} catch (error) {
  console.log('DB clients not available, using mock database');
}

// Determine which database to use
const useMockDb = !process.env.POSTGRES_URL || process.env.USE_MOCK_DB === 'true';
const mockDb = new MockDB();

// Export the appropriate DB client
export const db = useMockDb || !neonClient ? 
  mockDb : 
  drizzleClient(neonClient(process.env.POSTGRES_URL!));