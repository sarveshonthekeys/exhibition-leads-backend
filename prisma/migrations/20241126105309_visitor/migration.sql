/*
  Warnings:

  - Added the required column `districtId` to the `VisitorMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industryTypeId` to the `VisitorMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `VisitorMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[VisitorIntProduct] DROP CONSTRAINT [VisitorIntProduct_productId_fkey];

-- AlterTable
ALTER TABLE [dbo].[VisitorDetails] ALTER COLUMN [visitorName] NVARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] ALTER COLUMN [productFamilyId] INT NULL;
ALTER TABLE [dbo].[VisitorIntProduct] ALTER COLUMN [productId] INT NULL;
ALTER TABLE [dbo].[VisitorIntProduct] ADD [financingReuired] BIT,
[modelId] INT,
[noOfGiftsNeeded] INT,
[noOfMachines] INT,
[noOfPeopleAccompanied] INT,
[planningTimeline] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] ADD [districtId] INT NOT NULL,
[industryTypeId] INT NOT NULL,
[stateId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[IndustryTypeMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [industryType] NVARCHAR(1000) NOT NULL,
    [industryTypeDescription] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [IndustryTypeMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [IndustryTypeMaster_status_df] DEFAULT 1,
    CONSTRAINT [IndustryTypeMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[models] (
    [id] INT NOT NULL IDENTITY(1,1),
    [modelName] NVARCHAR(1000) NOT NULL,
    [productMasterId] INT NOT NULL,
    CONSTRAINT [models_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[models] ADD CONSTRAINT [models_productMasterId_fkey] FOREIGN KEY ([productMasterId]) REFERENCES [dbo].[ProductMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorMaster] ADD CONSTRAINT [VisitorMaster_industryTypeId_fkey] FOREIGN KEY ([industryTypeId]) REFERENCES [dbo].[IndustryTypeMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorMaster] ADD CONSTRAINT [VisitorMaster_stateId_fkey] FOREIGN KEY ([stateId]) REFERENCES [dbo].[stateMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorMaster] ADD CONSTRAINT [VisitorMaster_districtId_fkey] FOREIGN KEY ([districtId]) REFERENCES [dbo].[districtMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VisitorIntProduct] ADD CONSTRAINT [VisitorIntProduct_productId_fkey] FOREIGN KEY ([productId]) REFERENCES [dbo].[ProductMaster]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
