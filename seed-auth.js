const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const EMAIL = 'test@demo.com';
const PASSWORD = 'test1234';

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 10);

  // 1) Organization (needed because UserMaster.orgId is a required foreign key)
  let org = await prisma.organizationMaster.findFirst({ where: { orgEmail: 'org@demo.com' } });
  if (!org) {
    org = await prisma.organizationMaster.create({
      data: { orgName: 'Demo Org', orgMobileNo: '9000000000', orgEmail: 'org@demo.com', status: true },
    });
  }

  // 2) App version row (login looks this up by platform; must exist)
  const v = await prisma.versionMaster.findUnique({ where: { platform: 'ANDROID' } });
  if (!v) {
    await prisma.versionMaster.create({ data: { platform: 'ANDROID', latestVersion: '1.0.0', status: true } });
  }

  // 3) Test user with a HASHED password + active status
  const existing = await prisma.userMaster.findUnique({ where: { email: EMAIL } });
  if (existing) {
    await prisma.userMaster.update({ where: { email: EMAIL }, data: { password: hash, status: true, orgId: org.id } });
  } else {
    await prisma.userMaster.create({
      data: { orgId: org.id, username: 'Demo User', password: hash, email: EMAIL, status: true },
    });
  }

  console.log('SEEDED OK');
  console.log('  org id:', org.id);
  console.log('  login email:', EMAIL);
  console.log('  login password:', PASSWORD);
}

main()
  .catch((e) => { console.error('SEED ERROR:', e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
