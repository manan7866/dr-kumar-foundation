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

async function escapeSql(val: any): Promise<string> {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return val.toString();
  if (typeof val === 'string') {
    return "'" + val.replace(/'/g, "''").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
  }
  if (val instanceof Date) return "'" + val.toISOString() + "'";
  if (Array.isArray(val)) return "'" + JSON.stringify(val).replace(/'/g, "''") + "'";
  return "'" + String(val).replace(/'/g, "''") + "'";
}

async function exportToSQL() {
  try {
    console.log('Exporting database to SQL format...');
    
    let sql = '-- Dr. Kumar Foundation Database Dump\n';
    sql += `-- Exported at: ${new Date().toISOString()}\n\n`;
    
    // Export Users
    console.log('Exporting Users...');
    const users = await prisma.user.findMany();
    if (users.length > 0) {
      sql += '-- Table: users\n';
      for (const user of users) {
        sql += `INSERT INTO "users" ("id", "email", "password_hash", "full_name", "avatar_url", "role", "is_active", "approval_status", "created_at", "updated_at", "assigned_programs") VALUES (`;
        sql += [
          await escapeSql(user.id),
          await escapeSql(user.email),
          await escapeSql(user.password_hash),
          await escapeSql(user.full_name),
          await escapeSql(user.avatar_url),
          await escapeSql(user.role),
          await escapeSql(user.is_active),
          await escapeSql(user.approval_status),
          await escapeSql(user.created_at),
          await escapeSql(user.updated_at),
          await escapeSql(user.assigned_programs)
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
          await escapeSql(region.id),
          await escapeSql(region.continent),
          await escapeSql(region.name),
          await escapeSql(region.countries),
          await escapeSql(region.created_at),
          await escapeSql(region.updated_at)
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
          await escapeSql(quote.id),
          await escapeSql(quote.text),
          await escapeSql(quote.category),
          await escapeSql(quote.is_featured),
          await escapeSql(quote.display_order),
          await escapeSql(quote.is_active),
          await escapeSql(quote.created_at),
          await escapeSql(quote.updated_at)
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
          await escapeSql(gathering.id),
          await escapeSql(gathering.year),
          await escapeSql(gathering.location_city),
          await escapeSql(gathering.location_country),
          await escapeSql(gathering.region_name),
          await escapeSql(gathering.description),
          await escapeSql(gathering.created_at),
          await escapeSql(gathering.updated_at)
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
          await escapeSql(member.id),
          await escapeSql(member.full_name),
          await escapeSql(member.country),
          await escapeSql(member.city),
          await escapeSql(member.profession),
          await escapeSql(member.year_connected),
          await escapeSql(member.first_encounter),
          await escapeSql(member.resonated_quality),
          await escapeSql(member.life_changes),
          await escapeSql(member.continuing_engagement),
          await escapeSql(member.photo_url),
          await escapeSql(member.media_url),
          await escapeSql(member.approved),
          await escapeSql(member.visibility_status),
          await escapeSql(member.created_at),
          await escapeSql(member.updated_at)
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
          await escapeSql(reg.id),
          await escapeSql(reg.full_name),
          await escapeSql(reg.country),
          await escapeSql(reg.profession),
          await escapeSql(reg.year_connected),
          await escapeSql(reg.first_encounter),
          await escapeSql(reg.resonated_quality),
          await escapeSql(reg.life_changes),
          await escapeSql(reg.continuing_engagement),
          await escapeSql(reg.consent_accepted),
          await escapeSql(reg.review_status),
          await escapeSql(reg.reviewed_by),
          await escapeSql(reg.reviewed_at),
          await escapeSql(reg.created_at)
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
          await escapeSql(gov.id),
          await escapeSql(gov.full_name),
          await escapeSql(gov.role_title),
          await escapeSql(gov.bio_summary),
          await escapeSql(gov.term_start),
          await escapeSql(gov.term_end),
          await escapeSql(gov.display_order),
          await escapeSql(gov.is_active),
          await escapeSql(gov.created_at),
          await escapeSql(gov.updated_at)
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
          await escapeSql(p.id),
          await escapeSql(p.title),
          await escapeSql(p.definition),
          await escapeSql(p.context),
          await escapeSql(p.practical_implication),
          await escapeSql(p.selected_words),
          await escapeSql(p.display_order),
          await escapeSql(p.created_at),
          await escapeSql(p.updated_at)
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
          await escapeSql(s.id),
          await escapeSql(s.section_name),
          await escapeSql(s.content),
          await escapeSql(s.display_order),
          await escapeSql(s.created_at),
          await escapeSql(s.updated_at)
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
    await pool.end();
  }
}

exportToSQL();
