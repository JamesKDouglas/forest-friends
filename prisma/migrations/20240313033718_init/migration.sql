/*
  Warnings:

  - You are about to drop the column `timePeriod` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "timePeriod",
ADD COLUMN     "scheduleId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
