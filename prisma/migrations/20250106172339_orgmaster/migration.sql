/*
  Warnings:

  - You are about to drop the column `contactEmail` on the `OrganizationMaster` table. All the data in the column will be lost.
  - You are about to drop the column `contactMobile` on the `OrganizationMaster` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `OrganizationMaster` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgMobileNo]` on the table `OrganizationMaster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orgEmail]` on the table `OrganizationMaster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgEmail` to the `OrganizationMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgMobileNo` to the `OrganizationMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[OrganizationMaster] DROP CONSTRAINT [OrganizationMaster_contactEmail_key];

-- AlterTable
ALTER TABLE [dbo].[OrganizationMaster] DROP COLUMN [contactEmail],
[contactMobile],
[contactPerson];
ALTER TABLE [dbo].[OrganizationMaster] ADD [orgContactName] NVARCHAR(1000),
[orgEmail] NVARCHAR(1000) NOT NULL,
[orgMobileNo] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[OrganizationMaster] ADD CONSTRAINT [OrganizationMaster_orgMobileNo_key] UNIQUE NONCLUSTERED ([orgMobileNo]);

-- CreateIndex
ALTER TABLE [dbo].[OrganizationMaster] ADD CONSTRAINT [OrganizationMaster_orgEmail_key] UNIQUE NONCLUSTERED ([orgEmail]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
