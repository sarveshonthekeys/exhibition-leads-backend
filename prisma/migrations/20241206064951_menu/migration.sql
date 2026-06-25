/*
  Warnings:

  - You are about to drop the `MenuAssigned` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[MenuAssigned] DROP CONSTRAINT [MenuAssigned_roleMasterId_fkey];

-- DropTable
DROP TABLE [dbo].[MenuAssigned];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
