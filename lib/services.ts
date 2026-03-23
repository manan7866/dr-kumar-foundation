import prisma from './prisma';
import {
  CreateMemberDTO,
  UpdateMemberDTO,
  MemberFilters,
  PaginationParams,
  CreateMemberVersionDTO,
  CreateAuditLogDTO,
} from './types';

// ─────────────────────────────────────────────────────────────────────────────
// MEMBER SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const memberService = {
  // Get all members with pagination and filters
  async findAll(filters: MemberFilters & PaginationParams) {
    const { page = 1, limit = 10, ...filterParams } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filterParams.country) where.country = filterParams.country;
    if (filterParams.profession) where.profession = filterParams.profession;
    if (filterParams.year_connected) where.year_connected = filterParams.year_connected;
    if (filterParams.resonated_quality) where.resonated_quality = filterParams.resonated_quality;
    if (filterParams.approved !== undefined) where.approved = filterParams.approved;
    if (filterParams.visibility_status) where.visibility_status = filterParams.visibility_status;
    if (filterParams.search) {
      where.OR = [
        { full_name: { contains: filterParams.search, mode: 'insensitive' } },
        { country: { contains: filterParams.search, mode: 'insensitive' } },
        { profession: { contains: filterParams.search, mode: 'insensitive' } },
      ];
    }

    const [members, total] = await Promise.all([
      prisma.member.findMany({
        where,
        skip,
        take: limit,
        include: { country_ref: true },
        orderBy: { created_at: 'desc' },
      }),
      prisma.member.count({ where }),
    ]);

    return {
      data: members,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get member by ID
  async findById(id: string) {
    return prisma.member.findUnique({
      where: { id },
      include: { country_ref: true },
    });
  },

  // Get published members only
  async findPublished(filters: MemberFilters & PaginationParams) {
    return this.findAll({
      ...filters,
      approved: true,
      visibility_status: 'published',
    });
  },

  // Create member
  async create(data: CreateMemberDTO) {
    return prisma.member.create({
      data,
      include: { country_ref: true },
    });
  },

  // Update member
  async update(id: string, data: UpdateMemberDTO) {
    return prisma.member.update({
      where: { id },
      data,
      include: { country_ref: true },
    });
  },

  // Delete member
  async delete(id: string) {
    return prisma.member.delete({
      where: { id },
    });
  },

  // Archive member (soft delete)
  async archive(id: string) {
    return prisma.member.update({
      where: { id },
      data: { visibility_status: 'archived' },
    });
  },

  // Approve member
  async approve(id: string) {
    return prisma.member.update({
      where: { id },
      data: { approved: true, visibility_status: 'published' },
    });
  },

  // Create member version (for audit)
  async createVersion(data: CreateMemberVersionDTO) {
    return prisma.memberVersion.create({ data });
  },

  // Get member versions
  async getVersions(memberId: string) {
    return prisma.memberVersion.findMany({
      where: { member_id: memberId },
      orderBy: { version_number: 'desc' },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRATION SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const registrationService = {
  // Get all registrations with filters
  async findAll(filters: { review_status?: any; country?: string; search?: string } & PaginationParams) {
    const { page = 1, limit = 10, review_status, country, search } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (review_status) where.review_status = review_status;
    if (country) where.country = country;
    if (search) {
      where.OR = [
        { full_name: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
        { profession: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prisma.registration.count({ where }),
    ]);

    return {
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  // Get pending registrations
  async findPending() {
    return prisma.registration.findMany({
      where: { review_status: 'pending' },
      orderBy: { created_at: 'desc' },
    });
  },

  // Get registration by ID
  async findById(id: string) {
    return prisma.registration.findUnique({
      where: { id },
    });
  },

  // Create registration
  async create(data: any) {
    return prisma.registration.create({ data });
  },

  // Update registration
  async update(id: string, data: any) {
    return prisma.registration.update({
      where: { id },
      data,
    });
  },

  // Approve registration and create member
  async approve(id: string, reviewedBy: string) {
    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      throw new Error('Registration not found');
    }

    // Create member from registration with DRAFT status (admin must publish)
    const member = await prisma.member.create({
      data: {
        full_name: registration.full_name,
        country: registration.country,
        profession: registration.profession,
        year_connected: registration.year_connected,
        first_encounter: registration.first_encounter,
        resonated_quality: registration.resonated_quality,
        life_changes: registration.life_changes,
        continuing_engagement: registration.continuing_engagement,
        approved: true,
        visibility_status: 'draft', // Default to draft for admin review
      },
    });

    // Update registration status
    await prisma.registration.update({
      where: { id },
      data: {
        review_status: 'approved',
        reviewed_by: reviewedBy,
        reviewed_at: new Date(),
      },
    });

    return member;
  },

  // Reject registration
  async reject(id: string, reviewedBy: string) {
    return prisma.registration.update({
      where: { id },
      data: {
        review_status: 'rejected',
        reviewed_by: reviewedBy,
        reviewed_at: new Date(),
      },
    });
  },

  // Delete registration
  async delete(id: string) {
    return prisma.registration.delete({
      where: { id },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GOVERNANCE SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const governanceService = {
  // Get all governance members
  async findAll(filters?: { is_active?: boolean }) {
    const where = filters ? { is_active: filters.is_active } : {};

    return prisma.foundationGovernance.findMany({
      where,
      orderBy: [{ display_order: 'asc' }, { created_at: 'desc' }],
    });
  },

  // Get active governance members
  async findActive() {
    return prisma.foundationGovernance.findMany({
      where: { is_active: true },
      orderBy: { display_order: 'asc' },
    });
  },

  // Get governance by ID
  async findById(id: string) {
    return prisma.foundationGovernance.findUnique({
      where: { id },
    });
  },

  // Create governance entry
  async create(data: any) {
    return prisma.foundationGovernance.create({ data });
  },

  // Update governance entry
  async update(id: string, data: any) {
    return prisma.foundationGovernance.update({
      where: { id },
      data,
    });
  },

  // Delete governance entry
  async delete(id: string) {
    return prisma.foundationGovernance.delete({
      where: { id },
    });
  },

  // Archive governance entry
  async archive(id: string) {
    return prisma.foundationGovernance.update({
      where: { id },
      data: { is_active: false },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// REGION SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const regionService = {
  // Get all regions
  async findAll() {
    return prisma.region.findMany({
      orderBy: [{ continent: 'asc' }, { name: 'asc' }],
    });
  },

  // Get region by name
  async findByName(name: string) {
    return prisma.region.findUnique({
      where: { name },
    });
  },

  // Get regions by continent
  async findByContinent(continent: string) {
    return prisma.region.findMany({
      where: { continent },
      orderBy: { name: 'asc' },
    });
  },

  // Create region
  async create(data: { continent: string; name: string; countries?: string[] }) {
    return prisma.region.create({ 
      data: {
        ...data,
        countries: data.countries ? JSON.stringify(data.countries) : '[]',
      },
    });
  },

  // Update region
  async update(name: string, data: { continent?: string; name?: string; countries?: string[] }) {
    return prisma.region.update({
      where: { name },
      data: {
        ...data,
        countries: data.countries ? JSON.stringify(data.countries) : undefined,
      },
    });
  },

  // Delete region
  async delete(name: string) {
    return prisma.region.delete({
      where: { name },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// GATHERING SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const gatheringService = {
  // Get all gatherings
  async findAll(filters?: { year?: number; region_name?: string }) {
    const where = filters || {};

    return prisma.gathering.findMany({
      where,
      orderBy: { year: 'desc' },
    });
  },

  // Get gathering by ID
  async findById(id: string) {
    return prisma.gathering.findUnique({
      where: { id },
    });
  },

  // Create gathering
  async create(data: any) {
    return prisma.gathering.create({ data });
  },

  // Update gathering
  async update(id: string, data: any) {
    return prisma.gathering.update({
      where: { id },
      data,
    });
  },

  // Delete gathering
  async delete(id: string) {
    return prisma.gathering.delete({
      where: { id },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PRINCIPLE PAGE SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const principlePageService = {
  // Get all principle pages
  async findAll() {
    return prisma.principlePage.findMany({
      orderBy: { display_order: 'asc' },
    });
  },

  // Get principle page by ID
  async findById(id: string) {
    return prisma.principlePage.findUnique({
      where: { id },
    });
  },

  // Get principle page by title
  async findByTitle(title: string) {
    return prisma.principlePage.findUnique({
      where: { title },
    });
  },

  // Create principle page
  async create(data: any) {
    return prisma.principlePage.create({ data });
  },

  // Update principle page
  async update(id: string, data: any) {
    return prisma.principlePage.update({
      where: { id },
      data,
    });
  },

  // Delete principle page
  async delete(id: string) {
    return prisma.principlePage.delete({
      where: { id },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FOUNDATION SECTION SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const foundationSectionService = {
  // Get all foundation sections
  async findAll() {
    return prisma.foundationSection.findMany({
      orderBy: { display_order: 'asc' },
    });
  },

  // Get foundation section by ID
  async findById(id: string) {
    return prisma.foundationSection.findUnique({
      where: { id },
    });
  },

  // Get foundation section by name
  async findByName(sectionName: string) {
    return prisma.foundationSection.findUnique({
      where: { section_name: sectionName },
    });
  },

  // Create foundation section
  async create(data: any) {
    return prisma.foundationSection.create({ data });
  },

  // Update foundation section
  async update(id: string, data: any) {
    return prisma.foundationSection.update({
      where: { id },
      data,
    });
  },

  // Delete foundation section
  async delete(id: string) {
    return prisma.foundationSection.delete({
      where: { id },
    });
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// AUDIT LOG SERVICE
// ─────────────────────────────────────────────────────────────────────────────

export const auditLogService = {
  // Create audit log
  async create(data: CreateAuditLogDTO) {
    return prisma.auditLog.create({
      data: {
        action: data.action,
        entity_type: data.entity_type,
        entity_id: data.entity_id,
        user_id: data.user_id,
        user_email: data.user_email,
        user_role: data.user_role,
        changes: data.changes,
        ip_address: data.ip_address,
      },
      include: { user: true },
    });
  },

  // Get audit logs by entity
  async findByEntity(entityType: string, entityId: string) {
    return prisma.auditLog.findMany({
      where: { entity_type: entityType, entity_id: entityId },
      include: { user: true },
      orderBy: { created_at: 'desc' },
    });
  },

  // Get audit logs by user
  async findByUser(userId: string) {
    return prisma.auditLog.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'desc' },
    });
  },

  // Get all audit logs with pagination
  async findAll(page = 1, limit = 50) {
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        include: { user: true },
        orderBy: { created_at: 'desc' },
      }),
      prisma.auditLog.count(),
    ]);

    return {
      data: logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
};
