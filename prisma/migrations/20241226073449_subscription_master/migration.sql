BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[SubscriptionMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [userId] INT NOT NULL,
    [startDate] NVARCHAR(1000),
    [endDate] NVARCHAR(1000),
    [transactionStatus] BIT NOT NULL,
    [transactionReference] NVARCHAR(1000),
    [noOfDaysPending] NVARCHAR(1000) NOT NULL,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [SubscriptionMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [SubscriptionMaster_status_df] DEFAULT 0,
    CONSTRAINT [SubscriptionMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[SubscriptionMaster] ADD CONSTRAINT [SubscriptionMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
