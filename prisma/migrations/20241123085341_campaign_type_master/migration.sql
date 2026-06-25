BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CampaignTypeMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [camapignType] NVARCHAR(1000) NOT NULL,
    [campaignTypeDescription] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [CampaignTypeMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [CampaignTypeMaster_status_df] DEFAULT 1,
    CONSTRAINT [CampaignTypeMaster_pkey] PRIMARY KEY CLUSTERED ([id])
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
