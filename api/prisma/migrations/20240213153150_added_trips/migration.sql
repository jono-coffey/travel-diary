/*
  Warnings:

  - You are about to drop the column `endDate` on the `Entry` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Entry` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Trip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "startDate" REAL NOT NULL,
    "endDate" REAL NOT NULL,
    CONSTRAINT "Trip_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "destination" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "tripId" INTEGER,
    CONSTRAINT "Entry_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Entry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("createdAt", "createdById", "description", "destination", "id") SELECT "createdAt", "createdById", "description", "destination", "id" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
