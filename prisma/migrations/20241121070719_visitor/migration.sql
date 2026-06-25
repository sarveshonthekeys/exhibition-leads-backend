/*
  Warnings:

  - You are about to drop the column `visitorId` on the `VisitorIntProduct` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] DROP COLUMN [visitorId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
