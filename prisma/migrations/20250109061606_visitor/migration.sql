BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[VisitorMaster] DROP CONSTRAINT [VisitorMaster_sbuId_fkey];

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] ALTER COLUMN [sbuId] INT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorMaster] ADD CONSTRAINT [VisitorMaster_sbuId_fkey] FOREIGN KEY ([sbuId]) REFERENCES [dbo].[SbuMaster]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
