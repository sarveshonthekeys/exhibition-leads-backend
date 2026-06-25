/*
  Warnings:

  - Added the required column `isActive` to the `SubscriptionMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[SubscriptionMaster] ADD [isActive] BIT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[OrganizationTypeMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [orgType] NVARCHAR(1000) NOT NULL,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [OrganizationTypeMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [OrganizationTypeMaster_status_df] DEFAULT 1,
    CONSTRAINT [OrganizationTypeMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[OrganizationTypeMaster] ADD CONSTRAINT [OrganizationTypeMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
