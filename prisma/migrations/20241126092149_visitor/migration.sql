/*
  Warnings:

  - Added the required column `districtId` to the `CampaignMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stateId` to the `CampaignMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CampaignMaster] ADD [campaignObjective] NVARCHAR(1000),
[districtId] NVARCHAR(1000) NOT NULL,
[location] NVARCHAR(1000),
[stateId] NVARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[VisitorDetails] ALTER COLUMN [mobileNo] NVARCHAR(1000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
