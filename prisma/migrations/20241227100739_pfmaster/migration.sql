/*
  Warnings:

  - Added the required column `orgId` to the `ProductFamilyMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProductFamilyMaster] ADD [orgId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[ProductFamilyMaster] ADD CONSTRAINT [ProductFamilyMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
