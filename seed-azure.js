// One-off seed to create a working login user in Azure SQL.
// Creates: an organization, a role, ANDROID/IOS version rows, and a user
// (email: demo@exhibition.com / password: demo1234) with a bcrypt-hashed password.
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const org = await prisma.organizationMaster.upsert({
    where: { orgEmail: 'demo@exhibition.com' },
    update: {},
    create: { orgName: 'Demo Org', orgMobileNo: '9000000000', orgEmail: 'demo@exhibition.com' },
  });
  console.log('org id:', org.id);

  let role = await prisma.roleMaster.findFirst({ where: { orgId: org.id, roleName: 'Admin' } });
  if (!role) {
    role = await prisma.roleMaster.create({ data: { orgId: org.id, roleName: 'Admin' } });
  }
  console.log('role id:', role.id);

  await prisma.versionMaster.upsert({
    where: { platform: 'ANDROID' },
    update: { latestVersion: '1.0.0' },
    create: { platform: 'ANDROID', latestVersion: '1.0.0' },
  });
  await prisma.versionMaster.upsert({
    where: { platform: 'IOS' },
    update: { latestVersion: '1.0.0' },
    create: { platform: 'IOS', latestVersion: '1.0.0' },
  });
  console.log('version rows ready (1.0.0)');

  const hashed = await bcrypt.hash('demo1234', 10);
  const user = await prisma.userMaster.upsert({
    where: { email: 'demo@exhibition.com' },
    update: { password: hashed, status: true, orgId: org.id, roleId: role.id },
    create: {
      orgId: org.id,
      roleId: role.id,
      username: 'Demo User',
      email: 'demo@exhibition.com',
      password: hashed,
      status: true,
    },
  });
  console.log('SEED OK -> user id:', user.id);
  console.log('LOGIN WITH -> email: demo@exhibition.com  password: demo1234');
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('SEED FAILED:', e.message); process.exit(1); });
