/*
  Warnings:

  - You are about to drop the column `visitorType` on the `VisitorMaster` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] DROP COLUMN [visitorType];
ALTER TABLE [dbo].[VisitorMaster] ADD [companyType] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
