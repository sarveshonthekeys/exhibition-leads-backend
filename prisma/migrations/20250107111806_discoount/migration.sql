BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DiscountMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [discountCouponCode] NVARCHAR(1000) NOT NULL,
    [discountDescription] NVARCHAR(1000),
    [discountValueInPercent] INT NOT NULL,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [DiscountMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [DiscountMaster_status_df] DEFAULT 1,
    CONSTRAINT [DiscountMaster_pkey] PRIMARY KEY CLUSTERED ([id])
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
