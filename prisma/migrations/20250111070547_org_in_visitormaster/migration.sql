BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorDetails] ADD [orgId] INT;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] ADD [orgId] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
