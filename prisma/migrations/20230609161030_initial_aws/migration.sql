/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_categoryId_fkey";

-- DropTable
DROP TABLE "Categories";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "archivos" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "nombre_archivo" TEXT NOT NULL,
    "aws_key" TEXT NOT NULL,
    "aws_bucket" TEXT NOT NULL,
    "aws_region" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT NOW(),

    CONSTRAINT "archivos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "archivos_uuid_key" ON "archivos"("uuid");
