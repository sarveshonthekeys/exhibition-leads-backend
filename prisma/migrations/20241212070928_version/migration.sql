/*
  Warnings:

  - A unique constraint covering the columns `[platform]` on the table `VersionMaster` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[VersionMaster] ADD CONSTRAINT [VersionMaster_platform_key] UNIQUE NONCLUSTERED ([platform]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
