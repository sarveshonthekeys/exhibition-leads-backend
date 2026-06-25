/*
  Warnings:

  - Added the required column `sbuId` to the `VisitorDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sbuId` to the `VisitorIntProduct` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[GvDisbursementMaster] DROP CONSTRAINT [GvDisbursementMaster_orgId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[VisitorIntProduct] DROP CONSTRAINT [VisitorIntProduct_productId_fkey];

-- AlterTable
ALTER TABLE [dbo].[models] ALTER COLUMN [modelName] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[VisitorDetails] ADD [sbuId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] ADD [sbuId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[GvDisbursementMaster] ADD CONSTRAINT [GvDisbursementMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorMaster] ADD CONSTRAINT [VisitorMaster_sbuId_fkey] FOREIGN KEY ([sbuId]) REFERENCES [dbo].[SbuMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorIntProduct] ADD CONSTRAINT [VisitorIntProduct_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[ProductMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
