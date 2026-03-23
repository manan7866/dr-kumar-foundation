import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Using Neon cloud database
const DATABASE_URL = process.env.DATABASE_URL 

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: DATABASE_URL,
  },
});
