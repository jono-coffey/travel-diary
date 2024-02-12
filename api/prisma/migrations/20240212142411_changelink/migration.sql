/*
  Warnings:

  - You are about to drop the column `userId` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "destination" TEXT NOT NULL,
    "createdBy" INTEGER NOT NULL,
    CONSTRAINT "Entry_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Entry" ("createdAt", "description", "destination", "id") SELECT "createdAt", "description", "destination", "id" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
