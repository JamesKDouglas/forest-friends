-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "customerName" VARCHAR(255) NOT NULL,
    "childNames" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "timePeriod" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "startList" TIMESTAMP(3)[],
    "endList" TIMESTAMP(3)[],

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);
