/*
  Warnings:

  - You are about to alter the column `endDate` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `startDate` on the `Entry` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "destination" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "startDate" INTEGER,
    "endDate" INTEGER,
    CONSTRAINT "Entry_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("createdAt", "createdById", "description", "destination", "endDate", "id", "startDate") SELECT "createdAt", "createdById", "description", "destination", "endDate", "id", "startDate" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
