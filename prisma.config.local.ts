import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: 'postgresql://dkf_user:dfk123987pls@localhost:5432/dfk_db?schema=public',
  },
});
