import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, avatarUrl, currentPassword, newPassword } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updateData: any = {};

    // Update avatar if provided
    if (avatarUrl !== undefined) {
      updateData.avatar_url = avatarUrl;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isValid = await bcrypt.compare(currentPassword, user.password_hash);
      if (!isValid) {
        return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
      }

      // Hash new password
      updateData.password_hash = await bcrypt.hash(newPassword, 12);
    }

    // If no updates, return current user
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          avatar_url: user.avatar_url,
          role: user.role,
        },
      });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        full_name: updatedUser.full_name,
        avatar_url: updatedUser.avatar_url,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
