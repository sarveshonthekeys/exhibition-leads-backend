/*
  Warnings:

  - You are about to alter the column `status` on the `ProductMaster` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Bit`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProductMaster] ALTER COLUMN [createdBy] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[ProductMaster] ALTER COLUMN [status] BIT NOT NULL;
ALTER TABLE [dbo].[ProductMaster] ADD CONSTRAINT [ProductMaster_status_df] DEFAULT 1 FOR [status];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
