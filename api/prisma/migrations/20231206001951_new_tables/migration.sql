/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `PetType` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PetBreed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "petTypeId" TEXT NOT NULL,
    CONSTRAINT "PetBreed_petTypeId_fkey" FOREIGN KEY ("petTypeId") REFERENCES "PetType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PetBreed" ("description", "id", "name", "petTypeId") SELECT "description", "id", "name", "petTypeId" FROM "PetBreed";
DROP TABLE "PetBreed";
ALTER TABLE "new_PetBreed" RENAME TO "PetBreed";
CREATE UNIQUE INDEX "PetBreed_name_key" ON "PetBreed"("name");
CREATE TABLE "new_Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "petBreedId" TEXT NOT NULL,
    "petOwnerId" TEXT NOT NULL,
    CONSTRAINT "Pet_petBreedId_fkey" FOREIGN KEY ("petBreedId") REFERENCES "PetBreed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pet_petOwnerId_fkey" FOREIGN KEY ("petOwnerId") REFERENCES "PetOwner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pet" ("details", "id", "name", "petBreedId", "petOwnerId") SELECT "details", "id", "name", "petBreedId", "petOwnerId" FROM "Pet";
DROP TABLE "Pet";
ALTER TABLE "new_Pet" RENAME TO "Pet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PetType_name_key" ON "PetType"("name");
