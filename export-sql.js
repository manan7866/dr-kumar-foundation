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
    const value = valueParts.join('=').replace(/^"|"$/g, '');
    process.env[key.trim()] = value;
  }
}

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function exportToSQL() {
  try {
    console.log('Exporting database to SQL format...');
    
    let sql = '-- Dr. Kumar Foundation Database Dump\n';
    sql += `-- Exported at: ${new Date().toISOString()}\n\n`;
    
    // Helper function to escape SQL strings
    const escapeSql = (val) => {
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
      if (typeof val === 'number') return val.toString();
      if (typeof val === 'string') {
        return "'" + val.replace(/'/g, "''").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
      }
      if (val instanceof Date) return "'" + val.toISOString() + "'";
      if (Array.isArray(val)) return "'" + JSON.stringify(val).replace(/'/g, "''") + "'";
      return "'" + String(val).replace(/'/g, "''") + "'";
    };
    
    // Export Users
    console.log('Exporting Users...');
    const users = await prisma.user.findMany();
    if (users.length > 0) {
      sql += '-- Table: users\n';
      for (const user of users) {
        sql += `INSERT INTO "users" ("id", "email", "password_hash", "full_name", "avatar_url", "role", "is_active", "approval_status", "created_at", "updated_at", "assigned_programs") VALUES (`;
        sql += [
          escapeSql(user.id),
          escapeSql(user.email),
          escapeSql(user.password_hash),
          escapeSql(user.full_name),
          escapeSql(user.avatar_url),
          escapeSql(user.role),
          escapeSql(user.is_active),
          escapeSql(user.approval_status),
          escapeSql(user.created_at),
          escapeSql(user.updated_at),
          escapeSql(user.assigned_programs)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Regions
    console.log('Exporting Regions...');
    const regions = await prisma.region.findMany();
    if (regions.length > 0) {
      sql += '-- Table: regions\n';
      for (const region of regions) {
        sql += `INSERT INTO "regions" ("id", "continent", "name", "countries", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(region.id),
          escapeSql(region.continent),
          escapeSql(region.name),
          escapeSql(region.countries),
          escapeSql(region.created_at),
          escapeSql(region.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Quotes
    console.log('Exporting Quotes...');
    const quotes = await prisma.quote.findMany();
    if (quotes.length > 0) {
      sql += '-- Table: quotes\n';
      for (const quote of quotes) {
        sql += `INSERT INTO "quotes" ("id", "text", "category", "is_featured", "display_order", "is_active", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(quote.id),
          escapeSql(quote.text),
          escapeSql(quote.category),
          escapeSql(quote.is_featured),
          escapeSql(quote.display_order),
          escapeSql(quote.is_active),
          escapeSql(quote.created_at),
          escapeSql(quote.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Gatherings
    console.log('Exporting Gatherings...');
    const gatherings = await prisma.gathering.findMany();
    if (gatherings.length > 0) {
      sql += '-- Table: gatherings\n';
      for (const gathering of gatherings) {
        sql += `INSERT INTO "gatherings" ("id", "year", "location_city", "location_country", "region_name", "description", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(gathering.id),
          escapeSql(gathering.year),
          escapeSql(gathering.location_city),
          escapeSql(gathering.location_country),
          escapeSql(gathering.region_name),
          escapeSql(gathering.description),
          escapeSql(gathering.created_at),
          escapeSql(gathering.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Members
    console.log('Exporting Members...');
    const members = await prisma.member.findMany();
    if (members.length > 0) {
      sql += '-- Table: members\n';
      for (const member of members) {
        sql += `INSERT INTO "members" ("id", "full_name", "country", "city", "profession", "year_connected", "first_encounter", "resonated_quality", "life_changes", "continuing_engagement", "photo_url", "media_url", "approved", "visibility_status", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(member.id),
          escapeSql(member.full_name),
          escapeSql(member.country),
          escapeSql(member.city),
          escapeSql(member.profession),
          escapeSql(member.year_connected),
          escapeSql(member.first_encounter),
          escapeSql(member.resonated_quality),
          escapeSql(member.life_changes),
          escapeSql(member.continuing_engagement),
          escapeSql(member.photo_url),
          escapeSql(member.media_url),
          escapeSql(member.approved),
          escapeSql(member.visibility_status),
          escapeSql(member.created_at),
          escapeSql(member.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Registrations
    console.log('Exporting Registrations...');
    const registrations = await prisma.registration.findMany();
    if (registrations.length > 0) {
      sql += '-- Table: registrations\n';
      for (const reg of registrations) {
        sql += `INSERT INTO "registrations" ("id", "full_name", "country", "profession", "year_connected", "first_encounter", "resonated_quality", "life_changes", "continuing_engagement", "consent_accepted", "review_status", "reviewed_by", "reviewed_at", "created_at") VALUES (`;
        sql += [
          escapeSql(reg.id),
          escapeSql(reg.full_name),
          escapeSql(reg.country),
          escapeSql(reg.profession),
          escapeSql(reg.year_connected),
          escapeSql(reg.first_encounter),
          escapeSql(reg.resonated_quality),
          escapeSql(reg.life_changes),
          escapeSql(reg.continuing_engagement),
          escapeSql(reg.consent_accepted),
          escapeSql(reg.review_status),
          escapeSql(reg.reviewed_by),
          escapeSql(reg.reviewed_at),
          escapeSql(reg.created_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export FoundationGovernance
    console.log('Exporting FoundationGovernance...');
    const governance = await prisma.foundationGovernance.findMany();
    if (governance.length > 0) {
      sql += '-- Table: foundation_governance\n';
      for (const gov of governance) {
        sql += `INSERT INTO "foundation_governance" ("id", "full_name", "role_title", "bio_summary", "term_start", "term_end", "display_order", "is_active", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(gov.id),
          escapeSql(gov.full_name),
          escapeSql(gov.role_title),
          escapeSql(gov.bio_summary),
          escapeSql(gov.term_start),
          escapeSql(gov.term_end),
          escapeSql(gov.display_order),
          escapeSql(gov.is_active),
          escapeSql(gov.created_at),
          escapeSql(gov.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export PrinciplePage
    console.log('Exporting PrinciplePage...');
    const principles = await prisma.principlePage.findMany();
    if (principles.length > 0) {
      sql += '-- Table: principle_pages\n';
      for (const p of principles) {
        sql += `INSERT INTO "principle_pages" ("id", "title", "definition", "context", "practical_implication", "selected_words", "display_order", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(p.id),
          escapeSql(p.title),
          escapeSql(p.definition),
          escapeSql(p.context),
          escapeSql(p.practical_implication),
          escapeSql(p.selected_words),
          escapeSql(p.display_order),
          escapeSql(p.created_at),
          escapeSql(p.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export FoundationSection
    console.log('Exporting FoundationSection...');
    const sections = await prisma.foundationSection.findMany();
    if (sections.length > 0) {
      sql += '-- Table: foundation_sections\n';
      for (const s of sections) {
        sql += `INSERT INTO "foundation_sections" ("id", "section_name", "content", "display_order", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(s.id),
          escapeSql(s.section_name),
          escapeSql(s.content),
          escapeSql(s.display_order),
          escapeSql(s.created_at),
          escapeSql(s.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export AuditLog
    console.log('Exporting AuditLog...');
    const auditLogs = await prisma.auditLog.findMany();
    if (auditLogs.length > 0) {
      sql += '-- Table: audit_logs\n';
      for (const log of auditLogs) {
        sql += `INSERT INTO "audit_logs" ("id", "action", "entity_type", "entity_id", "user_id", "user_email", "user_role", "changes", "ip_address", "created_at") VALUES (`;
        sql += [
          escapeSql(log.id),
          escapeSql(log.action),
          escapeSql(log.entity_type),
          escapeSql(log.entity_id),
          escapeSql(log.user_id),
          escapeSql(log.user_email),
          escapeSql(log.user_role),
          escapeSql(log.changes),
          escapeSql(log.ip_address),
          escapeSql(log.created_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export UserProgram
    console.log('Exporting UserProgram...');
    const userPrograms = await prisma.userProgram.findMany();
    if (userPrograms.length > 0) {
      sql += '-- Table: user_programs\n';
      for (const up of userPrograms) {
        sql += `INSERT INTO "user_programs" ("id", "user_id", "program_type", "joined_at", "is_active", "created_at", "updated_at") VALUES (`;
        sql += [
          escapeSql(up.id),
          escapeSql(up.user_id),
          escapeSql(up.program_type),
          escapeSql(up.joined_at),
          escapeSql(up.is_active),
          escapeSql(up.created_at),
          escapeSql(up.updated_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Contribution
    console.log('Exporting Contribution...');
    const contributions = await prisma.contribution.findMany();
    if (contributions.length > 0) {
      sql += '-- Table: contributions\n';
      for (const c of contributions) {
        sql += `INSERT INTO "contributions" ("id", "user_program_id", "user_id", "user_name", "user_email", "program_type", "title", "activity_date", "venue_city", "venue_country", "participant_count", "participant_phones", "task_conducted", "results", "status", "admin_comment", "submitted_at", "reviewed_at", "reviewed_by") VALUES (`;
        sql += [
          escapeSql(c.id),
          escapeSql(c.user_program_id),
          escapeSql(c.user_id),
          escapeSql(c.user_name),
          escapeSql(c.user_email),
          escapeSql(c.program_type),
          escapeSql(c.title),
          escapeSql(c.activity_date),
          escapeSql(c.venue_city),
          escapeSql(c.venue_country),
          escapeSql(c.participant_count),
          escapeSql(c.participant_phones),
          escapeSql(c.task_conducted),
          escapeSql(c.results),
          escapeSql(c.status),
          escapeSql(c.admin_comment),
          escapeSql(c.submitted_at),
          escapeSql(c.reviewed_at),
          escapeSql(c.reviewed_by)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Task
    console.log('Exporting Task...');
    const tasks = await prisma.task.findMany();
    if (tasks.length > 0) {
      sql += '-- Table: tasks\n';
      for (const t of tasks) {
        sql += `INSERT INTO "tasks" ("id", "user_program_id", "user_id", "user_name", "user_email", "program_type", "title", "message", "status", "created_at", "due_date", "completed_at") VALUES (`;
        sql += [
          escapeSql(t.id),
          escapeSql(t.user_program_id),
          escapeSql(t.user_id),
          escapeSql(t.user_name),
          escapeSql(t.user_email),
          escapeSql(t.program_type),
          escapeSql(t.title),
          escapeSql(t.message),
          escapeSql(t.status),
          escapeSql(t.created_at),
          escapeSql(t.due_date),
          escapeSql(t.completed_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export Notification
    console.log('Exporting Notification...');
    const notifications = await prisma.notification.findMany();
    if (notifications.length > 0) {
      sql += '-- Table: notifications\n';
      for (const n of notifications) {
        sql += `INSERT INTO "notifications" ("id", "user_id", "title", "message", "type", "is_read", "link", "created_at") VALUES (`;
        sql += [
          escapeSql(n.id),
          escapeSql(n.user_id),
          escapeSql(n.title),
          escapeSql(n.message),
          escapeSql(n.type),
          escapeSql(n.is_read),
          escapeSql(n.link),
          escapeSql(n.created_at)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export EngagementRequest
    console.log('Exporting EngagementRequest...');
    const engagementRequests = await prisma.engagementRequest.findMany();
    if (engagementRequests.length > 0) {
      sql += '-- Table: engagement_requests\n';
      for (const er of engagementRequests) {
        sql += `INSERT INTO "engagement_requests" ("id", "program_type", "form_type", "payload", "status", "created_at", "reviewed_at", "reviewed_by") VALUES (`;
        sql += [
          escapeSql(er.id),
          escapeSql(er.program_type),
          escapeSql(er.form_type),
          escapeSql(er.payload),
          escapeSql(er.status),
          escapeSql(er.created_at),
          escapeSql(er.reviewed_at),
          escapeSql(er.reviewed_by)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    // Export MemberVersion
    console.log('Exporting MemberVersion...');
    const memberVersions = await prisma.memberVersion.findMany();
    if (memberVersions.length > 0) {
      sql += '-- Table: member_versions\n';
      for (const mv of memberVersions) {
        sql += `INSERT INTO "member_versions" ("id", "member_id", "full_name", "country", "city", "profession", "year_connected", "first_encounter", "resonated_quality", "life_changes", "continuing_engagement", "photo_url", "media_url", "version_number", "created_at", "created_by") VALUES (`;
        sql += [
          escapeSql(mv.id),
          escapeSql(mv.member_id),
          escapeSql(mv.full_name),
          escapeSql(mv.country),
          escapeSql(mv.city),
          escapeSql(mv.profession),
          escapeSql(mv.year_connected),
          escapeSql(mv.first_encounter),
          escapeSql(mv.resonated_quality),
          escapeSql(mv.life_changes),
          escapeSql(mv.continuing_engagement),
          escapeSql(mv.photo_url),
          escapeSql(mv.media_url),
          escapeSql(mv.version_number),
          escapeSql(mv.created_at),
          escapeSql(mv.created_by)
        ].join(', ') + ');\n';
      }
      sql += '\n';
    }
    
    sql += '-- End of dump\n';
    
    fs.writeFileSync('dump.sql', sql);
    console.log('\n✅ Database exported to dump.sql successfully!');
    
  } catch (error) {
    console.error('Export failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

exportToSQL();
