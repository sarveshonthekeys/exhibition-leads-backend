BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ProductMaster] DROP CONSTRAINT [ProductMaster_orgId_fkey];

-- AlterTable
ALTER TABLE [dbo].[ProductFamilyMaster] ADD [sbuId] INT;

-- AddForeignKey
ALTER TABLE [dbo].[ProductFamilyMaster] ADD CONSTRAINT [ProductFamilyMaster_sbuId_fkey] FOREIGN KEY ([sbuId]) REFERENCES [dbo].[SbuMaster]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductMaster] ADD CONSTRAINT [ProductMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
