BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[ProductMaster] ADD CONSTRAINT [ProductMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductMaster] ADD CONSTRAINT [ProductMaster_sbuId_fkey] FOREIGN KEY ([sbuId]) REFERENCES [dbo].[SbuMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProductMaster] ADD CONSTRAINT [ProductMaster_productFamilyId_fkey] FOREIGN KEY ([productFamilyId]) REFERENCES [dbo].[ProductFamilyMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
