-- A song is only locked by a registration that hasn't been sung yet, so sung
-- registrations can stay as history after "Resetear canciones" releases the song.

-- DropIndex
DROP INDEX "Registration_eventId_songId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Registration_eventId_songId_key" ON "Registration"("eventId", "songId") WHERE (status <> 'SUNG');
