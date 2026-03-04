import 'dotenv/config';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function createProgramUsers() {
  try {
    const password = 'Admindkfusa7861%';
    const passwordHash = await bcrypt.hash(password, 12);

    const users = [
      {
        email: 'healing@email.com',
        full_name: 'Healing Programs Director',
        role: 'program_director',
      },
      {
        email: 'environment@email.com',
        full_name: 'Environmental Programs Director',
        role: 'program_director',
      },
      {
        email: 'youth@email.com',
        full_name: 'Youth Engagement Director',
        role: 'program_director',
      },
      {
        email: 'music@email.com',
        full_name: 'Sufi Music Programs Director',
        role: 'program_director',
      },
      {
        email: 'ecommerce@email.com',
        full_name: 'Sufi Ecommerce Director',
        role: 'program_director',
      },
      {
        email: 'science@email.com',
        full_name: 'Sufi Science Programs Director',
        role: 'program_director',
      },
      {
        email: 'interfaith@email.com',
        full_name: 'Interfaith Programs Director',
        role: 'program_director',
      },
    ];

    console.log('Creating program user accounts...\n');

    for (const userData of users) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`⚠️  ${userData.email} already exists - skipping`);
        continue;
      }

      // Create user
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          password_hash: passwordHash,
          full_name: userData.full_name,
          role: userData.role as any,
          is_active: true,
          approval_status: 'approved',
        },
      });

      console.log(`✅ Created: ${user.email}`);
    }

    console.log('\n✅ Program users created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('─────────────────────────────────────────────────────');
    console.log('Password for ALL accounts: ' + password);
    console.log('─────────────────────────────────────────────────────\n');
    
    users.forEach((u, i) => {
      console.log(`${i + 1}. ${u.email}`);
      console.log(`   Role: ${u.role}`);
      console.log(`   Name: ${u.full_name}`);
      console.log('');
    });

    console.log('⚠️  IMPORTANT: Change these passwords in production!');
    console.log('\nLogin at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createProgramUsers();
