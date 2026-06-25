// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import statesArray from './model/stateModel';
import Districts from './model/districtModel';
import { MenuArray } from './model/menuModel';
import { VersionArray } from './model/versionModel';
const prisma = new PrismaClient();

async function main() {
  await prisma.organizationMaster.upsert({
    where: { id: 1 }, // Ensure no duplicates
    update: {},
    create: {
      orgName: 'Copia',
      orgDescription: 'An example organization for seeding purposes.',
      address: 'Airoli',
      pincode: 400615,
      orgContactName: 'Mangesh Kaijkar',
      orgMobileNo: '987654321',
      orgEmail: 'contact@example.com',
      status: true,
    },
  });
  await prisma.roleMaster.upsert({
    where: { id: 1 }, // Ensure no duplicates
    update: {},
    create: {
      orgId: 1,
      roleName: 'Admin',
      roleDescription: 'Admin',
      createdBy: 'Admin',
      menu: {
        create: [
          { menuId: 1, menuName: 'Leads' },
          { menuId: 2, menuName: 'Campaign' },
          { menuId: 3, menuName: 'Setup' },
          { menuId: 4, menuName: 'Users' },
          { menuId: 5, menuName: 'Approvals' },
          { menuId: 6, menuName: 'Gifts' },
          { menuId: 7, menuName: 'Reports' },
          { menuId: 8, menuName: 'Subscription' },
        ],
      },
      status: true,
    },
  });

  await prisma.sbuMaster.upsert({
    where: { id: 1 },
    update: {},
    create: {
      orgId: 1,
      sbuName: 'Sales',
      sbuDescription: 'Sales',
      Status: true,
    },
  });

  // Seed data for User
  await prisma.userMaster.upsert({
    where: { id: 1 },
    update: {},
    create: {
      orgId: 1,
      sbuId: 1,
      username: 'admin',
      password: 'admin',
      email: 'admin@gmail.com',
      mobile: '9373246331',
      address: 'airoli',
      pincode: 1,
      roleId: 1,
      status: true,
    },
  });
  for (const menu of MenuArray) {
    await prisma.menuMaster.upsert({
      where: { name: menu.name }, // Ensure no duplicates
      update: {},
      create: {
        name: menu.name,
      },
    });
  }

  // for (const state of statesArray) {
  //   await prisma.stateMaster.upsert({
  //     where: { name: state.state }, // Ensure no duplicates
  //     update: {},
  //     create: {
  //       name: state.state,
  //     },
  //   });
  // }
  // for (const district of Districts) {
  //   await prisma.districtMaster.upsert({
  //     where: { name: district.district }, // Ensure no duplicates
  //     update: {},
  //     create: {
  //       stateId: district.stateId,
  //       name: district.district,
  //     },
  //   });
  // }

  for (const version of VersionArray) {
    await prisma.versionMaster.upsert({
      where: { platform: version.platform }, // Ensure no duplicates
      update: {},
      create: {
        platform: version.platform,
        latestVersion: version.latestVersion,
      },
    });
  }
  console.log('User seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
