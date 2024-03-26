-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "desc" TEXT NOT NULL DEFAULT 'no description',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'no name';
