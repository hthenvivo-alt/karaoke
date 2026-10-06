-- Sing along: the titular shares a 4-digit code and up to 3 friends join the registration

-- AlterTable
ALTER TABLE "Registration" ADD COLUMN     "joinCode" TEXT;

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" TEXT NOT NULL,
    "registrationId" TEXT NOT NULL,
    "singerName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GroupMember_registrationId_idx" ON "GroupMember"("registrationId");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

