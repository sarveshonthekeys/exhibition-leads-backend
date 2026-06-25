/*
  Warnings:

  - You are about to drop the column `orgId` on the `OrganizationTypeMaster` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[OrganizationTypeMaster] DROP CONSTRAINT [OrganizationTypeMaster_orgId_fkey];

-- AlterTable
ALTER TABLE [dbo].[OrganizationMaster] ADD [orgTypeId] INT;

-- AlterTable
ALTER TABLE [dbo].[OrganizationTypeMaster] DROP COLUMN [orgId];

-- AddForeignKey
ALTER TABLE [dbo].[OrganizationMaster] ADD CONSTRAINT [OrganizationMaster_orgTypeId_fkey] FOREIGN KEY ([orgTypeId]) REFERENCES [dbo].[OrganizationTypeMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
