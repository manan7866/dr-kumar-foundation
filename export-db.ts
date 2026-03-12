import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

async function exportDatabase() {
  try {
    console.log('Exporting database...');
    
    const data = {
      exported_at: new Date().toISOString(),
      User: await prisma.user.findMany(),
      Region: await prisma.region.findMany(),
      Quote: await prisma.quote.findMany(),
      Gathering: await prisma.gathering.findMany(),
    };

    fs.writeFileSync('dump.json', JSON.stringify(data, null, 2));
    console.log('Database exported to dump.json');
    
    // Print summary
    console.log('\n=== Export Summary ===');
    for (const [table, rows] of Object.entries(data)) {
      if (table !== 'exported_at') {
        console.log(`${table}: ${rows.length} rows`);
      }
    }
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

exportDatabase();
