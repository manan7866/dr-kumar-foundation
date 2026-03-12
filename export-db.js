const fs = require('fs');
const path = require('path');

// Load .env manually
const envPath = path.resolve(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');

for (const line of envLines) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
    const [key, ...valueParts] = trimmed.split('=');
    const value = valueParts.join('=').replace(/^"|"$/g, ''); // Remove surrounding quotes
    process.env[key.trim()] = value;
  }
}

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
  }
}

exportDatabase();
