/*
  Warnings:

  - You are about to drop the column `androidVersion` on the `VersionMaster` table. All the data in the column will be lost.
  - You are about to drop the column `iosVersion` on the `VersionMaster` table. All the data in the column will be lost.
  - Added the required column `latestVersion` to the `VersionMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VersionMaster] DROP COLUMN [androidVersion],
[iosVersion];
ALTER TABLE [dbo].[VersionMaster] ADD [latestVersion] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
