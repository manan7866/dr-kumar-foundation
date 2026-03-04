import 'dotenv/config';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function updateAdminCredentials() {
  try {
    const newEmail = 'admin@dkf.sufisciencecenter.info';
    const newPassword = 'Admindkfusa7861%';

    // Check if admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'super_admin' },
    });

    if (!existingAdmin) {
      console.log('❌ No admin account found. Creating new admin account...');
      
      // Create new admin
      const passwordHash = await bcrypt.hash(newPassword, 12);
      const admin = await prisma.user.create({
        data: {
          email: newEmail,
          password_hash: passwordHash,
          full_name: 'Site Administrator',
          role: 'super_admin',
          is_active: true,
          approval_status: 'approved',
        },
      });

      console.log('✅ New admin account created successfully!');
      console.log('');
      console.log('📧 Email:    ' + admin.email);
      console.log('🔑 Password: ' + newPassword);
      console.log('');
      console.log('⚠️  IMPORTANT: Change this password after first login!');
      console.log('');
      console.log('Login at: http://localhost:3000/admin/login');
      return;
    }

    // Update existing admin
    const passwordHash = await bcrypt.hash(newPassword, 12);
    const admin = await prisma.user.update({
      where: { id: existingAdmin.id },
      data: {
        email: newEmail,
        password_hash: passwordHash,
      },
    });

    console.log('✅ Admin credentials updated successfully!');
    console.log('');
    console.log('📧 New Email:    ' + admin.email);
    console.log('🔑 New Password: ' + newPassword);
    console.log('');
    console.log('⚠️  IMPORTANT: Store these credentials securely!');
    console.log('');
    console.log('Login at: http://localhost:3000/admin/login');
  } catch (error) {
    console.error('❌ Error updating admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminCredentials();
