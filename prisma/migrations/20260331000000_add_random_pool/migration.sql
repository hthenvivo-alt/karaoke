-- CreateTable
CREATE TABLE "RandomPoolEntry" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "singerName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RandomPoolEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RandomPoolEntry_eventId_singerName_key" ON "RandomPoolEntry"("eventId", "singerName");

-- AddForeignKey
ALTER TABLE "RandomPoolEntry" ADD CONSTRAINT "RandomPoolEntry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
