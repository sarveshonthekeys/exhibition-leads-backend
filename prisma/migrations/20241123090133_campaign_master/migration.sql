/*
  Warnings:

  - Added the required column `campaignTypeId` to the `CampaignMaster` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CampaignMaster] ADD [campaignTypeId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[CampaignMaster] ADD CONSTRAINT [CampaignMaster_campaignTypeId_fkey] FOREIGN KEY ([campaignTypeId]) REFERENCES [dbo].[CampaignTypeMaster]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
