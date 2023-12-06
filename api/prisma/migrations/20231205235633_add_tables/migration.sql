-- CreateTable
CREATE TABLE "PetType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PetOwner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "contactSecondary" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "addressSecondary" TEXT
);

-- CreateTable
CREATE TABLE "PetBreed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "petTypeId" TEXT NOT NULL,
    CONSTRAINT "PetBreed_petTypeId_fkey" FOREIGN KEY ("petTypeId") REFERENCES "PetType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "petBreedId" TEXT NOT NULL,
    "petOwnerId" TEXT NOT NULL,
    CONSTRAINT "Pet_petBreedId_fkey" FOREIGN KEY ("petBreedId") REFERENCES "PetBreed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pet_petOwnerId_fkey" FOREIGN KEY ("petOwnerId") REFERENCES "PetOwner" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PetOwner_email_key" ON "PetOwner"("email");
