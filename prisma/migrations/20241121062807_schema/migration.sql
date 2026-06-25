/*
  Warnings:

  - You are about to drop the column `Name` on the `VisitorMaster` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `VisitorMaster` table. All the data in the column will be lost.
  - You are about to drop the column `mobileNo` on the `VisitorMaster` table. All the data in the column will be lost.
  - You are about to drop the column `productFamilyId` on the `VisitorMaster` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `VisitorMaster` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `VisitorMaster` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] DROP COLUMN [Name],
[email],
[mobileNo],
[productFamilyId],
[productId],
[quantity];

-- CreateTable
CREATE TABLE [dbo].[VisitorIntProduct] (
    [id] INT NOT NULL IDENTITY(1,1),
    [visitorId] INT NOT NULL,
    [productFamilyId] INT NOT NULL,
    [productId] INT NOT NULL,
    [visitorMasterId] INT,
    CONSTRAINT [VisitorIntProduct_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[VisitorDetails] (
    [id] INT NOT NULL IDENTITY(1,1),
    [visitorName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [mobileNo] INT,
    [visitorMasterId] INT,
    CONSTRAINT [VisitorDetails_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[GvDisbursementMaster] ADD CONSTRAINT [GvDisbursementMaster_visitorId_fkey] FOREIGN KEY ([visitorId]) REFERENCES [dbo].[VisitorMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorIntProduct] ADD CONSTRAINT [VisitorIntProduct_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[ProductMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorIntProduct] ADD CONSTRAINT [VisitorIntProduct_visitorMasterId_fkey] FOREIGN KEY ([visitorMasterId]) REFERENCES [dbo].[VisitorMaster]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorDetails] ADD CONSTRAINT [VisitorDetails_visitorMasterId_fkey] FOREIGN KEY ([visitorMasterId]) REFERENCES [dbo].[VisitorMaster]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
