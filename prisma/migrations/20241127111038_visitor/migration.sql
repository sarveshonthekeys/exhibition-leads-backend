/*
  Warnings:

  - You are about to drop the column `giftVoucher` on the `VisitorMaster` table. All the data in the column will be lost.
  - You are about to drop the column `gvDisbursement` on the `VisitorMaster` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] DROP COLUMN [giftVoucher],
[gvDisbursement];
ALTER TABLE [dbo].[VisitorMaster] ADD [giftDetails] NVARCHAR(1000),
[noOfGifts] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
