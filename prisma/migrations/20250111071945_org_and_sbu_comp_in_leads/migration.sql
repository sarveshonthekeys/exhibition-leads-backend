/*
  Warnings:

  - Made the column `userId` on table `VisitorDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orgId` on table `VisitorDetails` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `VisitorIntProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orgId` on table `VisitorIntProduct` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `VisitorMaster` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorDetails] ALTER COLUMN [sbuId] INT NULL;
ALTER TABLE [dbo].[VisitorDetails] ALTER COLUMN [userId] INT NOT NULL;
ALTER TABLE [dbo].[VisitorDetails] ALTER COLUMN [orgId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] ALTER COLUMN [sbuId] INT NULL;
ALTER TABLE [dbo].[VisitorIntProduct] ALTER COLUMN [userId] INT NOT NULL;
ALTER TABLE [dbo].[VisitorIntProduct] ALTER COLUMN [orgId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] ALTER COLUMN [userId] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
