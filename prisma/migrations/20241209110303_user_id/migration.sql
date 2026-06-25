BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserMaster] DROP CONSTRAINT [UserMaster_status_df];
ALTER TABLE [dbo].[UserMaster] ADD CONSTRAINT [UserMaster_status_df] DEFAULT 0 FOR [status];

-- AlterTable
ALTER TABLE [dbo].[VisitorDetails] ADD [userId] INT;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] ADD [userId] INT;

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] ADD [userId] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
