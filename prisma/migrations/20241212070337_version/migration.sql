BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[VersionMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [platform] NVARCHAR(1000) NOT NULL,
    [androidVersion] NVARCHAR(1000) NOT NULL,
    [iosVersion] NVARCHAR(1000) NOT NULL,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [VersionMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [VersionMaster_status_df] DEFAULT 0,
    CONSTRAINT [VersionMaster_pkey] PRIMARY KEY CLUSTERED ([id])
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
