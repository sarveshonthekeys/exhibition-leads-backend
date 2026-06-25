/*
  Warnings:

  - You are about to drop the column `financingReuired` on the `VisitorIntProduct` table. All the data in the column will be lost.
  - You are about to drop the column `noOfGiftsNeeded` on the `VisitorIntProduct` table. All the data in the column will be lost.
  - You are about to drop the column `noOfPeopleAccompanied` on the `VisitorIntProduct` table. All the data in the column will be lost.
  - You are about to drop the column `planningTimeline` on the `VisitorIntProduct` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[VisitorIntProduct] DROP COLUMN [financingReuired],
[noOfGiftsNeeded],
[noOfPeopleAccompanied],
[planningTimeline];

-- AlterTable
ALTER TABLE [dbo].[VisitorMaster] ADD [financingReuired] BIT,
[noOfGiftsNeeded] INT,
[noOfPeopleAccompanied] INT,
[planningTimeline] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
