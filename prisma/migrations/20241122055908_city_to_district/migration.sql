/*
  Warnings:

  - You are about to drop the `cityMaster` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[cityMaster] DROP CONSTRAINT [cityMaster_stateId_fkey];

-- DropTable
DROP TABLE [dbo].[cityMaster];

-- CreateTable
CREATE TABLE [dbo].[districtMaster] (
    [id] INT NOT NULL IDENTITY(1,1),
    [stateId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [districtMaster_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [districtMaster_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[districtMaster] ADD CONSTRAINT [districtMaster_stateId_fkey] FOREIGN KEY ([stateId]) REFERENCES [dbo].[stateMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
