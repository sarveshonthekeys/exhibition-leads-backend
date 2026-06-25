BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[MenuAssigned] (
    [id] INT NOT NULL IDENTITY(1,1),
    [roleMasterId] INT,
    [menuId] INT,
    [menuName] NVARCHAR(1000),
    CONSTRAINT [MenuAssigned_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[MenuAssigned] ADD CONSTRAINT [MenuAssigned_roleMasterId_fkey] FOREIGN KEY ([roleMasterId]) REFERENCES [dbo].[RoleMaster]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
