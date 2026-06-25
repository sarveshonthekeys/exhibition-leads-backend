/*
  Warnings:

  - You are about to drop the column `Campaign Name` on the `CampaignMaster` table. All the data in the column will be lost.
  - You are about to drop the column `From Date` on the `CampaignMaster` table. All the data in the column will be lost.
  - You are about to drop the column `To Date` on the `CampaignMaster` table. All the data in the column will be lost.
  - Added the required column `campaignName` to the `CampaignMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromDate` to the `CampaignMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toDate` to the `CampaignMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CampaignMaster] ALTER COLUMN [createdBy] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[CampaignMaster] DROP COLUMN [Campaign Name],
[From Date],
[To Date];
ALTER TABLE [dbo].[CampaignMaster] ADD [campaignName] NVARCHAR(1000) NOT NULL,
[fromDate] DATETIME2 NOT NULL,
[toDate] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
