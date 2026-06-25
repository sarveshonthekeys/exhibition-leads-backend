BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[CampaignMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [Campaign Name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [From Date] DATETIME2 NOT NULL,
    [To Date] DATETIME2 NOT NULL,
    [createdBy] NVARCHAR(1000) NOT NULL,
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [CampaignMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [CampaignMaster_status_df] DEFAULT 1,
    CONSTRAINT [CampaignMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GvDisbursementMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [sbuId] INT NOT NULL,
    [visitorId] INT NOT NULL,
    [gvDisbursement] BIT NOT NULL,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [GvDisbursementMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [GvDisbursementMaster_status_df] DEFAULT 1,
    CONSTRAINT [GvDisbursementMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[OrganizationMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgName] NVARCHAR(1000) NOT NULL,
    [orgDescription] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [pincode] INT,
    [contactPerson] NVARCHAR(1000),
    [contactMobile] INT,
    [contactEmail] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [OrganizationMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [OrganizationMaster_status_df] DEFAULT 1,
    CONSTRAINT [OrganizationMaster_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [OrganizationMaster_contactEmail_key] UNIQUE NONCLUSTERED ([contactEmail])
);

-- CreateTable
CREATE TABLE [dbo].[ProductFamilyMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [productFamilyName] NVARCHAR(1000) NOT NULL,
    [productFamilyDescription] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [ProductFamilyMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [ProductFamilyMaster_status_df] DEFAULT 1,
    CONSTRAINT [ProductFamilyMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProductMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [sbuId] INT NOT NULL,
    [productFamilyId] INT NOT NULL,
    [productCode] NVARCHAR(1000) NOT NULL,
    [productName] NVARCHAR(1000) NOT NULL,
    [productDescription] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000) NOT NULL,
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [ProductMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ProductMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RoleMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [roleName] NVARCHAR(1000) NOT NULL,
    [roleDescription] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [RoleMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [RoleMaster_status_df] DEFAULT 1,
    CONSTRAINT [RoleMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SbuMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [sbuName] NVARCHAR(1000) NOT NULL,
    [sbuDescription] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [SbuMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [Status] BIT NOT NULL CONSTRAINT [SbuMaster_Status_df] DEFAULT 1,
    CONSTRAINT [SbuMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [orgName] NVARCHAR(1000),
    [sbuId] INT,
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [mobile] INT,
    [address] NVARCHAR(1000),
    [pincode] INT,
    [roleId] INT,
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [UserMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [UserMaster_status_df] DEFAULT 1,
    CONSTRAINT [UserMaster_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserMaster_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[VisitorMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orgId] INT NOT NULL,
    [sbuId] INT NOT NULL,
    [campaignId] INT NOT NULL,
    [Name] NVARCHAR(1000) NOT NULL,
    [visitorType] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [mobileNo] INT,
    [companyName] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [pincode] INT,
    [productFamilyId] INT,
    [productId] INT,
    [quantity] INT,
    [attachmentId] INT,
    [giftVoucher] NVARCHAR(1000),
    [gvDisbursement] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [createdOn] DATETIME2 NOT NULL CONSTRAINT [VisitorMaster_createdOn_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedBy] NVARCHAR(1000),
    [modifiedOn] DATETIME2,
    [status] BIT NOT NULL CONSTRAINT [VisitorMaster_status_df] DEFAULT 1,
    CONSTRAINT [VisitorMaster_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CampaignMaster] ADD CONSTRAINT [CampaignMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GvDisbursementMaster] ADD CONSTRAINT [GvDisbursementMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[GvDisbursementMaster] ADD CONSTRAINT [GvDisbursementMaster_sbuId_fkey] FOREIGN KEY ([sbuId]) REFERENCES [dbo].[SbuMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RoleMaster] ADD CONSTRAINT [RoleMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[SbuMaster] ADD CONSTRAINT [SbuMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserMaster] ADD CONSTRAINT [UserMaster_orgId_fkey] FOREIGN KEY ([orgId]) REFERENCES [dbo].[OrganizationMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserMaster] ADD CONSTRAINT [UserMaster_sbuId_fkey] FOREIGN KEY ([sbuId]) REFERENCES [dbo].[SbuMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserMaster] ADD CONSTRAINT [UserMaster_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[RoleMaster]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
