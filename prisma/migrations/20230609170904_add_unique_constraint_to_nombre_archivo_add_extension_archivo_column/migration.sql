/*
  Warnings:

  - A unique constraint covering the columns `[nombre_archivo]` on the table `archivos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "archivos" ADD COLUMN     "extension_archivo" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "created_at" SET DEFAULT NOW();

-- CreateIndex
CREATE UNIQUE INDEX "archivos_nombre_archivo_key" ON "archivos"("nombre_archivo");
