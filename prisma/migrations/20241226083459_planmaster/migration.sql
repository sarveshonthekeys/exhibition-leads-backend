/*
  Warnings:

  - Added the required column `planId` to the `SubscriptionMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[SubscriptionMaster] ADD [planId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[PlanMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [validity] NVARCHAR(1000) NOT NULL,
    [price] INT NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [PlanMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [PlanMaster_status_df] DEFAULT 1,
    CONSTRAINT [PlanMaster_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [PlanMaster_name_key] UNIQUE NONCLUSTERED ([name])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
