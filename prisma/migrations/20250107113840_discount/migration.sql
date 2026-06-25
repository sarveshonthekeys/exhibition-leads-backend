/*
  Warnings:

  - A unique constraint covering the columns `[discountCouponCode]` on the table `DiscountMaster` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[DiscountMaster] ADD CONSTRAINT [DiscountMaster_discountCouponCode_key] UNIQUE NONCLUSTERED ([discountCouponCode]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
